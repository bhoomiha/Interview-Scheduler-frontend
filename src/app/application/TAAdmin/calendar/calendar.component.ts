import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { InterviewService } from '../../../core/services/interview.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth'; // For Year View
import { CommonModule } from '@angular/common';
import { Interview } from '../../../shared/models/interview';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule,CommonModule, MatIconModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  showLegend: boolean = false;
  interviews: Interview[] = [];
  isPopupOpen: boolean = false;
  selectedInterview: any = null;
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
  

  constructor(private readonly interviewService: InterviewService) {}

  ngOnInit(): void {
    this.loadScheduledInterviews();
  }

  loadScheduledInterviews(): void {
    this.interviewService.getAllInterviews().subscribe((data: Interview[]) => {
      console.log("interviews", data);
      const events = data.map(event => {
        const date = event.date.split('T')[0];
        const startDateTime = `${date}T${event.startTime}`;
        const endDateTime = `${date}T${event.endTime}`;
  
        return {
          title: event.panelMemberName,
          start: startDateTime,
          end: endDateTime,
          classNames: [this.getEventClass(event.status)],
          extendedProps: {
            panelMember: event.panelMemberName,
            candidateName: event.candidateName,
            status: event.status,
            startTime: startDateTime,
            endTime: endDateTime,
            
          }
        };
      });
  
      //  Update calendar options reactively
      this.calendarOptions = {
        ...this.calendarOptions,
        events: events
      };
    });
  }
  toggleLegend() {
    this.showLegend = !this.showLegend;
  }
  

  // Handle event click
  // handleEventClick(info: any): void {
  //   alert(`Interview Details:\nPanel: ${info.event.title}\nDate: ${info.event.start}\nEnd Time: ${info.event.end}`);
  // }
  handleEventClick(info: any): void {
    const props = info.event.extendedProps;

  this.selectedInterview = {
    panelMember: props.panelMember,
    candidateName: props.candidateName,
    status: props.status,
    startTime: info.event.start,
    endTime: info.event.end,
    
  };

  this.isPopupOpen = true;
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

  closePopup(): void {
    this.isPopupOpen = false;
    this.selectedInterview = null;
  }
}
