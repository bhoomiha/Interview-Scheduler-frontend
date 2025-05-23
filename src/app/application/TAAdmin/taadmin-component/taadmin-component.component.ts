import { Component, OnInit } from '@angular/core';
import { Interview } from '../../../shared/models/interview';
import { InterviewService } from '../../../core/services/interview.service';
import { SlotAvailabilityService } from '../../../core/services/slot-availability.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { SlotTA } from '../../../shared/models/slotTA';
 
@Component({
  selector: 'app-taadmin-component',
  standalone: true,
  imports: [CommonModule, DashboardComponent, RouterOutlet],
  templateUrl: './taadmin-component.component.html',
  styleUrl: './taadmin-component.component.scss'
})
export class TAAdminComponentComponent implements OnInit {
  interviews: Interview[] = [];
  slots: SlotTA[] =[];
  currentUserId!: string;
 
  constructor(private readonly interviewService: InterviewService,
    private readonly slotservice : SlotAvailabilityService,
    private  readonly authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser ? currentUser.userId.toString() : '';
    this.loadSlot();
  }
 
 
  loadSlot() {
    this.slotservice.getAllSlot().subscribe({
      next: (data) => {
        console.log('Fetched Interviews:', data);
        this.slots = data;
      },
      error: (error) => {
        console.error('Error Fetching Interviews:', error);
      }
    });
  }
 
 
}