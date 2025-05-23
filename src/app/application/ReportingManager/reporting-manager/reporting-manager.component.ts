import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporting-manager',
  standalone:true,
  imports: [RouterOutlet,DashboardComponent,CommonModule],
  templateUrl: './reporting-manager.component.html',
  styleUrl: './reporting-manager.component.scss'
})
export class ReportingManagerComponent {

  isExpanded = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
