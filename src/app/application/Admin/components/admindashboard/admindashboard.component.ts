import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent {
  sidebarOpen = signal(true); //  Sidebar starts open

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen()); //  Toggle sidebar state
  }

  isSidebarOpen() {
    return this.sidebarOpen();
  }
}
