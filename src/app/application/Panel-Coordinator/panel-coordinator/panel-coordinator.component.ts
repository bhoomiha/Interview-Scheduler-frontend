import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-coordinator',
  standalone:true,
  imports: [RouterOutlet,DashboardComponent,CommonModule],
  templateUrl: './panel-coordinator.component.html',
  styleUrl: './panel-coordinator.component.scss'
})
export class PanelCoordinatorComponent {
  isExpanded = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
