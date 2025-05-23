import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';

// This is the parent component for the Panel Member module. 
// It acts as a container for all child components
@Component({
  selector: 'app-panel-member',
  standalone: true,
  imports: [CommonModule,RouterOutlet, DashboardComponent,FormsModule,FullCalendarModule],
  templateUrl: './panel-member.component.html',
  styleUrl: './panel-member.component.scss'
})
export class PanelMemberComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: []
  };
  constructor() {
    console.log("PanelMemberComponent Loaded");
  }
}