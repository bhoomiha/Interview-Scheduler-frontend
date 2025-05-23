import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'; // For Year View
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { PanelMemberWithSkillSetDTO, PanelWindow } from '../../../../shared/models/panel-window';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-panel-calendar',
  standalone: true,
  imports: [CommonModule, MatNativeDateModule,FullCalendarModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule,MatDatepickerModule],
  templateUrl: './panel-calendar.component.html',
  styleUrls: ['./panel-calendar.component.scss']
})
export class PanelCalendarComponent implements OnInit {
  selectedWindow:{
    panelWindowName: string;
    skillSet: string;
    startTime: Date;
    endTime: Date;
    members: PanelMemberWithSkillSetDTO[]; // Optional: You can replace 'any[]' with PanelMember[] if you have a model
  } | null = null;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Default Outlook-like view (Week View)
    plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin], // Load necessary plugins
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear' // Switch between Month, Week, and Day views
    },
    buttonText: {
      today: 'Go to Today', // Rename "Today" button
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year'
    },
    dayMaxEvents: 2,
    selectable: true,
    editable: false, // Prevent dragging events
    nowIndicator: true,
    events: [],
    select: this.handleDateSelection.bind(this),
    eventClick: this.showPanelWindowDetails.bind(this)
  };

  panelWindow: PanelWindow = {
    panelWindowId: '',
    panelWindowName: '',
    startDate: new Date(),
    endDate: new Date(),
    skillSet: ''
  };

  successMessage = '';
  errorMessage = '';
  isPopupOpen = false;
  isWindowPopupOpen = false;

  constructor(private readonly panelService: PanelCoordinatorService) {}

  ngOnInit(): void {
    this.loadPanelWindows();
  }

  /**  Handle Date Selection from Calendar */
  
    handleDateSelection(selectInfo:any) :  void {
      this.panelWindow.startDate = new Date(selectInfo.startStr);

    const endDate = new Date(selectInfo.endStr);
    endDate.setDate(endDate.getDate() - 1);
    this.panelWindow.endDate = new Date(endDate); // assign Date directly
      this.openAddEventPopup(); // Open the popup
    }
  

  /** Load Panel Windows and Display on Calendar */
  loadPanelWindows() {
    const eventColors = ['#7a4c8f', '#388e3c', '#1976d2', '#f57c00', '#c2185b', '#0097a7'];
    this.panelService.getAllPanelWindows().subscribe({
      next: (panelWindows: PanelWindow[]) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: panelWindows.map((a: PanelWindow, index:number) => ({
            title: `${a.panelWindowName} | SkillSet : ${a.skillSet}`,
            start: a.startDate,
            end: new Date(new Date(a.endDate).setDate(new Date(a.endDate).getDate() + 1)),
            backgroundColor: eventColors[index % eventColors.length],
          borderColor: eventColors[index % eventColors.length],
          textColor: '#fffff',
          extendedProps: {
            panelWindowId: a.panelWindowId
          }

          }))
        };
      },
      error: (err) => {
        console.error('Failed to load panel windows:', err);
      }
    });
  }

  showPanelWindowDetails(info: EventClickArg) {
    const event = info.event;
    const panelWindowId = event.extendedProps['panelWindowId'];

    // Call API to get detailed PanelWindow info (with members)
    this.panelService.getPanelWindow(panelWindowId).subscribe({
      next: (result) => {
        console.log('PanelWindow details:', result);

        this.selectedWindow = {
          panelWindowName: result.panelWindowName.split('| ')[0],
          skillSet: result.skillSet.split(': ')[0],
          startTime: result.startDate,
          endTime: result.endDate,
          members: result.panelMembers! // List of Panel Members
        };

        this.isWindowPopupOpen = true;
      },
      error: (err) => {
        console.error('Error fetching PanelWindow details:', err);
      }
    });
  }

  /** Open Popup and Reset Form */
  openAddEventPopup() {
    this.isPopupOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  /** Close Popup */
  closePopup() {
    this.isPopupOpen = false;
    this.resetForm();
  }

  closeWindowPopup() {
    this.isWindowPopupOpen = false;
    this.selectedWindow = null;
  }

  /** Allocate Panel Window */
  AllocatePanelWindow() {
    // Ensure UUID is set     
    this.panelWindow.panelWindowId = uuidv4();
    
    console.log("Sending PanelWindow:", this.panelWindow); // Debugging

    this.panelService.allocatePanelWindow(this.panelWindow).subscribe({
      next: (response) => {
        console.log("Response from backend:", response);
        this.successMessage = 'Event added successfully!';
        this.loadPanelWindows(); // Refresh calendar
        this.closePopup();
      },
      error: (error) => {
        console.error("API Error:", error);
        this.errorMessage = `${error?.error?.errors ?? 'Unknown error'}`;
      }
    });
  }

  /** Reset Form Fields */
  resetForm() {
    this.panelWindow = {
      panelWindowId: '',
      panelWindowName: '',
      startDate: new Date(),
      endDate: new Date(),
      skillSet: ''
    };
  }
}
