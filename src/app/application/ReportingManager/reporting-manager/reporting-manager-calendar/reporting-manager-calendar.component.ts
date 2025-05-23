import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'; // For Year View
import interactionPlugin from '@fullcalendar/interaction';
import { ReportingManagerService } from '../../../../core/services/reporting-manager.service';
import { SlotDetails } from '../../../../shared/models/slot-details';

@Component({
  selector: 'app-reporting-manager-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './reporting-manager-calendar.component.html',
  styleUrls: ['./reporting-manager-calendar.component.scss']
})
export class ReportingManagerCalendarComponent implements OnInit {

  calendarOptions!: CalendarOptions;
  isPopupOpen = false;
  selectedSlot: SlotDetails | null = null;

  constructor(private readonly managerService: ReportingManagerService) { }

  ngOnInit(): void {
    this.setupCalendar(); // Initialize Calendar settings
    this.loadTeamMembers(); // Fetch interview data
  }

  /**
   * Initializes the FullCalendar options (ensuring eventClick is set properly)
   */
  setupCalendar() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
      },
      buttonText: {
        today: 'Today',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year'
      },
      dayMaxEvents: 2,
      selectable: false,
      editable: false,
      eventResizableFromStart: false,
      nowIndicator: true,
      events: [], // Empty initially, will be updated dynamically
      eventClick: this.showSlotDetails.bind(this) // Ensure eventClick has correct context
    };
  }

  /**
   * Fetches interview data from the API and updates calendar events
   */
  loadTeamMembers() {
    this.managerService.getTeamMembersSlot().subscribe({
      next: (slots: SlotDetails[]) => {
        console.log('Fetched Interviews:', slots);

        const formattedEvents = slots.map((a:SlotDetails) => ({
          title: `${a.panelMemberName} - ${a.status}`,
          start: this.combineDateAndTime(a.date, a.startTime),
          end: this.combineDateAndTime(a.date, a.endTime),
          classNames: [this.getEventClass(a.status)],
          extendedProps: {
            panelMember: a.panelMemberName,
            reportingManager: a.reportingManager,
            date: a.date
          } // Extra details for popup
        }));

        console.log('Formatted Events:', formattedEvents);


        this.calendarOptions = {
          ...this.calendarOptions,
          events: formattedEvents
        };
      },
      error: (err) => console.error('Failed to load Interviews:', err)
    });
  }

  /**
   * Converts separate `date` and `time` strings into a valid JavaScript Date object
   */
  combineDateAndTime(date: string, time: string | undefined): Date {
    if (!date || !time) return new Date(); // Default to current date if missing

    const datePart = date.split('T')[0];
    return new Date(`${datePart}T${time}`);
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
      default: return 'event-default';
    }
  }

  /**
   * Handles interview click event and opens a popup with details
   */
  showSlotDetails(info: any) {
    const event = info.event;

    this.selectedSlot = {
      panelMemberName: event.title.split(' - ')[0], // Extract Candidate Name
      status: event.title.split(' - ')[1], // Extract Status
      startTime: event.start,
      endTime: event.end,
      date: event.extendedProps.date,
      reportingManager: event.extendedProps.reportingManager
    };

    this.isPopupOpen = true; // Open popup
  }


  closePopup() {
    this.isPopupOpen = false;
    this.selectedSlot = null;
  }
}
