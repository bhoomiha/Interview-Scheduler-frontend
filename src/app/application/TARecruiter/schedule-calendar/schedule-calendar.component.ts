import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SlotAvailabilityService } from '../../../core/services/slot-availability.service';
import { MatDialog } from '@angular/material/dialog';
import { LockSlotModalComponent } from '../lock-slot-modal/lock-slot-modal.component';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PanelCoordinatorService } from '../../../core/services/panel-coordinator.service';
import multiMonthPlugin from '@fullcalendar/multimonth'; // For Year View
import { InterviewService } from '../../../core/services/interview.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { PanelMembers } from '../../../shared/models/panelmembers';
import { MatIconModule } from '@angular/material/icon';
import { PanelMemberModalComponent } from '../panel-member-modal/panel-member-modal.component';
import { customAlert } from '../../../shared/models/alert-util';
import { SlotTA } from '../../../shared/models/slotTA';
import { Interview } from '../../../shared/models/interview';

@Component({
  selector: 'app-schedule-calendar',
  standalone: true,
  imports: [FullCalendarModule,MatIconModule,CommonModule],
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
  
  isPopupOpen: boolean = false;
  selectedInterview: any = null;
  currentUserId: string | null = null;
  userToken: any;
  showLegend: boolean = false;


  calendarOptions: CalendarOptions = {
    initialView: 'multiMonthYear',
    plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: 'Go to Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      year: 'Year'
    },
    selectable: true,
    dayMaxEvents: 2,
    editable: false,
    nowIndicator: true,
    events: [],
    eventClick: this.handleEventClick.bind(this),
    
  };
  

  constructor(
    private readonly slotService: SlotAvailabilityService,
    private readonly panelcoordinatorService: PanelCoordinatorService,
    private readonly interviewService: InterviewService, 
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSlots();
    const currentUser = this.authService.getCurrentUser();
     this.userToken = currentUser?.accessToken ?? null;  // Extract token from user object
     this.currentUserId = this.extractUserIdFromToken(this.userToken); // Decode token to get userId
     console.log("Extracted User ID:", this.currentUserId); // Debugging log
   
  }
  
  extractUserIdFromToken(token: string | null): string | null {
    if (!token || typeof token !== 'string') return null;  // Ensure token is valid
  
    try {
      const payload = token.split('.')[1];  // Extract payload
      const decodedPayload = atob(payload);  // Decode Base64
      const decodedToken = JSON.parse(decodedPayload);  // Convert to JSON
  
      return decodedToken.nameid ?? null;  // Get userId
    } catch (e) {
      console.error('Invalid token format', e);
      return null;
    }
  }
  toggleLegend() {
    this.showLegend = !this.showLegend;
  }

  loadSlots(): void {
    this.slotService.getAllSlot().subscribe((data: any[]) => {
      const events = data
      .filter(slot => !((slot.status === 'Cancelled' && slot.lockedBy === null) || slot.status === 'Initiated')) // Exclude cancelled + unlocked and initiated slots
      .map(slot => {

        const startDateTime = `${slot.date.split('T')[0]}T${slot.startTime}`;
        const endDateTime = `${slot.date.split('T')[0]}T${slot.endTime}`;

        return {
           //  Store slotId
          title: `${slot.panelMemberName} - ${slot.status}`,
          start: startDateTime,
          end: endDateTime,
          classNames: [this.getEventClass(slot.status, slot.lockedBy)],
          color: this.getEventClass(slot.status, slot.lockedBy),
          extendedProps: { slot }
        };
      });

      this.calendarOptions.events = events;
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const slot = clickInfo.event.extendedProps['slot'];
  
    if (slot.status === 'Available') {
      this.getPanelMember(slot.panelMemberName).subscribe((panelMember) => {
        this.dialog.open(LockSlotModalComponent, {
          data: { slot, panelMember }
        
        }).afterClosed().subscribe((updated) => {
          if (updated) this.loadSlots();
        });
      });
    } 
    else if(slot.status === 'Initiated'){
       this.openPanelDetails(slot);
    }
    else if (slot.status === 'InProgress') {
      if (slot.lockedBy !== this.currentUserId) {
       customAlert('This slot is locked by another user');
        return; // Stop further execution
      }
  
      this.getPanelMember(slot.panelMemberName).subscribe((panelMember) => {
        this.dialog.open(ScheduleModalComponent, {
          data: { slot, panelMember },
          
        }).afterClosed().subscribe((updated) => {
          if (updated) this.loadSlots();
        });
      });
    } 
    else  {
      this.showInterviewDetails(clickInfo,slot);
    }
  }

  
/**
   * Returns color based on interview status
   */
  getEventClass(status: string, lockedBy:string): string {
    switch (status) {
      case 'Scheduled': return 'event-scheduled';
      case 'Completed': return 'event-completed';
      case 'Cancelled': return 'event-cancelled';
      case 'Request Cancellation': return 'event-initiated';
       case 'InProgress':
       return lockedBy !== this.currentUserId ? 'event-other' : 'event-inprogress';
      case 'Available': return 'event-available';
      default: return 'event-default';
    }
  }
  
  /**
   * Fetch interview details when a scheduled slot is clicked
   */
  showInterviewDetails(clickInfo: EventClickArg, slot: SlotTA) {
    const slotId = slot.slotId; //  Get slotId
    console.log(`Slot Clicked: ${slotId}`);

    // Fetch all interviews and filter by slotId
    this.interviewService.getInterviewBySlotId(slotId).subscribe({
      next: (interview: Interview) => {
        console.log('Fetched Interview:', interview);
        
        // const interview = interviews.find(i => i.slotId === slotId); //  Find matching interview

        if (interview) {
          this.selectedInterview = {
            candidateName: interview.candidateName,
            status: interview.status,
            startTime: clickInfo.event.start,
            endTime: clickInfo.event.end,
            panelMember: interview.panelMemberName,
            reportingManager: interview.reportingManager
          };

          this.isPopupOpen = true; // Open popup
        } else {
          console.log(`No interview found for slot ${slotId}`);
        }
      },
      error: (err) => console.error('Failed to fetch Interviews:', err)
    });
  }

  closePopup() {
    this.isPopupOpen = false;
    this.selectedInterview = null;
  }

  
  

  getPanelMember(panelMemberName: string): Observable<PanelMembers | null> {

    return this.panelcoordinatorService.getAllPanelMembers().pipe(
      map((data: PanelMembers[]) => {
        return data.find(member => member.name === panelMemberName) || null;
      }),
      catchError((error) => {
        console.error('Error fetching panel members:', error);
        return of(null); // Return null if an error occurs
      })
    );
  }

  
    openPanelDetails(slot: SlotTA): void {
        this.panelcoordinatorService.getAllPanelMembers().subscribe((panelMembers) => {
          const panelMember = panelMembers.find((member) => member.name === slot.panelMemberName);
           console.log(panelMember);
          if (panelMember) {
            this.dialog.open(PanelMemberModalComponent, {
              data: panelMember,
              width: '400px',
            });
          } else {
            customAlert('Panel Member not found.');
          }
        });
      }
  }
  
  

