import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; 
import { PanelMemberService } from '../../../core/services/panel-member.service';
import { customAlert } from '../../../shared/models/alert-util';
import { CreateSlotDTO, Slot } from '../../../shared/models/slot';


@Component({
  selector: 'app-panel-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './panel-member-calendar.component.html',
  styleUrls: ['./panel-member-calendar.component.scss']
})
export class PanelCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'multiMonthYear',
    plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
    },
    buttonText: {
      today: 'Go to Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      year: 'Year'
    },
    dayMaxEvents: 2,
    selectable: true,
    editable: false,
    nowIndicator: true,
    events: [],
    select: this.handleDateSelection.bind(this),
  };

  successMessage= '';
  errorMessage = '';
  isPopupOpen = false;
  availableDates: string[] = []; 
  selectedTimeSlot = '';
  availableTimeSlots: string[] = [];
  createSlots: CreateSlotDTO = {  
    slotId: '',
    date: '',
    startTime: '',
    endTime: '',
    userId: '',
    status: 'Pending',
    lockedBy: null
  };
  filteredEndTimes: string[] = [];

  constructor(private panelService: PanelMemberService) {}

  ngOnInit(): void {
    this.loadPanelWindows();
    this.generateTimeSlots();
  }

  /**  Load Panel Windows & Set Available Dates */
  loadPanelWindows() {
    this.panelService.getPanelWindows().subscribe({
      next: (panelWindows) => {
        this.availableDates = panelWindows.flatMap((panel) =>
          this.getDateRange(new Date(panel.startDate), new Date(panel.endDate))
        );
  
        const panelEvents = panelWindows.map((panel) => ({
          title: `${panel.panelWindowName} - ${panel.skillSet}`,
          start: panel.startDate,
          end: new Date(new Date(panel.endDate).setDate(new Date(panel.endDate).getDate() + 1)),
          color: '#FF5733',
        }));
  
        // Fetch all slots and merge into calendar view
        this.panelService.getSlots().subscribe({
          next: (slots) => {
            const slotEvents = slots.map((slot) => ({
              start: this.combineDateAndTime(slot.date, slot.startTime),
          end: this.combineDateAndTime(slot.date, slot.endTime),
              title: `Slot: ${slot.startTime} - ${slot.endTime}`,
              color: this.getSlotColor(slot.status),
              classNames: [this.getEventClass(slot.status)],
            }));
  
            this.calendarOptions = {
              ...this.calendarOptions,
              events: [...panelEvents, ...slotEvents],
            };
          },
          error: (err) => console.error('Error loading slots:', err),
        });
      },
      error: (err) => console.error('Error loading panel windows:', err),
    });
  }
  
  /**
   * Returns color based on interview status
   */
  getEventClass(status: string): string {
    switch (status) {
      case 'Scheduled': return 'event-scheduled';
      case 'Completed': return 'event-completed';
      case 'Cancelled': return 'event-cancelled';
      case 'Initiated': return 'event-initiated';
      case 'InProgress': return 'event-inprogress';
      case 'Available': return 'event-available';
      case 'Request Cancellation': return 'event-request_cancellation';
      default: return 'event-default';
    }
  }

  /**
   * Converts separate `date` and `time` strings into a valid JavaScript Date object
   */
  combineDateAndTime(date: string, time: string | undefined): Date {
    if (!date || !time) return new Date(); // Default to current date if missing

    const datePart = date.split('T')[0];
    return new Date(`${datePart}T${time}`);
  }
  
  createSlot() {
    this.errorMessage = ''; // Reset errors
    this.successMessage = ''; // Reset success message
  
    //  Check if required fields are selected
    if (!this.createSlots.startTime || !this.createSlots.endTime) {
      this.errorMessage = ' Please select a valid time slot!';
      return;
    }
  
    //  Check if the selected date is within the allocated window
    const selectedDateStr = this.createSlots.date.toString().split('T')[0];
    if (!this.availableDates.includes(selectedDateStr)) {
      this.errorMessage = ' The selected date is outside the allocated date range.';
      return;
    }
  
    //  Check if the slot time is already submitted
    this.panelService.getSlots().subscribe({
        next: (slots: Slot[]) => {
          const selectedDateStr = this.createSlots.date.toString().split('T')[0];
      
          const isConflict = slots.some(slot =>
            new Date(slot.date).toISOString().split('T')[0] === selectedDateStr &&
            slot.startTime === this.createSlots.startTime &&
            slot.endTime === this.createSlots.endTime
          );
  
        if (isConflict) {
          this.errorMessage = ' This time slot is already booked!';
          return;
        }
  
        //  If no conflicts, proceed with slot creation
        this.createSlots.userId = uuidv4();
  
        this.panelService.createSlot(this.createSlots).subscribe({
          next: () => {
            this.successMessage = ' Slot created successfully!';
            this.loadPanelWindows();
            this.closePopup(); 
          },
          error: (error) => {
            this.errorMessage = ` Slot creation failed: ${error?.error?.errors || 'Unknown error'}`;
          }
        });
      },
      error: () => {
        this.errorMessage = ' Error checking existing slots!';
      }
    });
  }    
  
  getSlotColor(status: string): string {
    switch (status) {
      case 'Scheduled': return '#6f42c1';
      case 'Available': return '#28a745';
      case 'InProgress': return  '#ffc107';
      case 'Cancelled': return '#f80606';
      default: return '#6c757d';
    }
  } 

  /**  Restrict Selection to Available Dates */
  handleDateSelection(selectInfo: DateSelectArg) {
    const selectedDate = new Date(selectInfo.startStr);
  
    if (!this.availableDates.includes(selectedDate.toString().split('T')[0])) {

      customAlert(' No Allocated Window for the Selected Date');
      return;
    }
  
this.createSlots.date = selectedDate.toISOString().split('T')[0];
    this.openAddEventPopup();
  }
  

  generateTimeSlots() {
    this.availableTimeSlots = [];
    for (let hour = 9; hour <= 19; hour++) {
      for (const minute of [0, 10, 20, 30, 40, 50]) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.availableTimeSlots.push(formattedTime);
      }
    }
  }
  
  
   
  updateEndTimeOptions() {
    if (!this.createSlots.startTime) return;
  
    // Filter end times to be after the selected start time
    this.filteredEndTimes = this.availableTimeSlots.filter(time => time > this.createSlots.startTime);
  
    // Pre-fill the end time if none is selected
    if (!this.createSlots.endTime && this.filteredEndTimes.length) {
      this.createSlots.endTime = this.filteredEndTimes[0];
    }
  }
  
  /**  Generate Date Range for Panel Windows */
  getDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  /**  Open Popup */
  openAddEventPopup() {
    this.isPopupOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  /**  Close Popup */
  closePopup() {
    this.isPopupOpen = false;
  }
}
