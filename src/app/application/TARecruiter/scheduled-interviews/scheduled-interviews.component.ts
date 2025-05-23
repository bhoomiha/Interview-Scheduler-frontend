import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { Interview } from '../../../shared/models/interview';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-scheduled-interviews',
  standalone: true,
  templateUrl: './scheduled-interviews.component.html',
  styleUrls: ['./scheduled-interviews.component.scss'],
  imports: [CommonModule, FormsModule, NgxPaginationModule]
})
export class ScheduledInterviewsComponent implements OnInit {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  allInterviews: Interview[] = [];
  interviews: Interview[] = [];
  hoursList: string[] = ['09', '10', '11', '12', '13', '14','15','16', '17','18', '19']; // 24-hour format
  minutesList: string[] = ['00', '30']; // Only 00 and 30
  filters = {
    name: '',
    date: '',
    startHour: '',
  startMinute: '',
  endHour: '',
  endMinute: '',
    status: ''
  };

  constructor(private readonly interviewService: InterviewService) {}

  ngOnInit(): void {
    this.loadInterviews();
  }

  loadInterviews() {
    this.interviewService.getAllInterviews().subscribe({
      next: (data) => {
        this.allInterviews = data;
        this.interviews = [...data];
        console.log(data);
      },
      error: (error) => {
        console.error('Error Fetching Interviews:', error);
      }
    });
  }
  applyFilters() {
    const filterStartTime = this.filters.startHour && this.filters.startMinute
      ? this.convertTimeToMinutes(`${this.filters.startHour}:${this.filters.startMinute}`)
      : null;
 
    const filterEndTime = this.filters.endHour && this.filters.endMinute
      ? this.convertTimeToMinutes(`${this.filters.endHour}:${this.filters.endMinute}`)
      : null;
 
    this.interviews = this.allInterviews.filter(interview =>
      (!this.filters.name || interview.panelMemberName.toLowerCase().includes(this.filters.name.toLowerCase())) &&
      (!this.filters.name || interview.candidateName.toLowerCase().includes(this.filters.name.toLowerCase())) &&
      (!this.filters.name || interview.reportingManager.toLowerCase().includes(this.filters.name.toLowerCase())) &&
      (!this.filters.date || interview.date.split('T')[0] === this.filters.date) &&
      (!this.filters.status || interview.status === this.filters.status) &&
      this.matchTimeFilter(interview.startTime, interview.endTime, filterStartTime, filterEndTime)
    );

    
  }

  getStatusTooltip(status: string): string {
    switch (status) {
      case 'Available':
        return 'Slot is open for booking.';
      case 'Scheduled':
        return 'Interview is scheduled and confirmed.';
      case 'Cancelled':
        return 'Interview has been cancelled.';
      case 'Request Cancellation':
        return 'Cancellation request is pending approval.';
      default:
        return 'Status unknown or not defined.';
    }
  }  
 

  matchTimeFilter(startTime: string, endTime: string, filterStart: number | null, filterEnd: number | null): boolean {
    const slotStartTime = this.convertTimeToMinutes(startTime);
    const slotEndTime = this.convertTimeToMinutes(endTime);
 
    return (
      // If only start time is given, show all slots that start at or after that time (within 30 min)
      (!filterStart || (slotStartTime >= filterStart && slotStartTime < filterStart + 30)) &&
 
      // If only end time is given, show all slots that end at or before that time (within 30 min)
      (!filterEnd || (slotEndTime >= filterEnd - 29 && slotEndTime <= filterEnd + 29))
    );
  }
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  resetFilters() {
    this.filters = {
      name: '',
      date: '',
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      status: ''
    };
    this.interviews = [...this.allInterviews]; 
  }
  
}
