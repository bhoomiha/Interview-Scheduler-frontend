import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { Interview } from '../../../shared/models/interview';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview-list',
  standalone: true,
  imports: [
    CommonModule,FormsModule,MatTableModule,MatDatepickerModule,MatNativeDateModule,MatSortModule, MatTooltipModule,MatPaginator ],
  templateUrl: './interview-list.component.html',
  styleUrl: './interview-list.component.scss'
})
export class InterviewListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  SearchQuery: string = '';
  selectedDate: string = '';
  fromTime: string = ''; // format: "HH:mm"
  toTime: string = '';   // format: "HH:mm"
  selectedStatus: string = 'All';
  statusOptions: string[] = ['Scheduled', 'Cancelled','Request Cancellation']; 
  interviews: Interview[] = [];
  dataSource = new MatTableDataSource<Interview>();
  displayedColumns: string[] = [
    'candidate','panelMemberName','reportingManager','date','startTime','endTime','status','actions'];

  
  constructor(private readonly interviewService: InterviewService) {}

  ngOnInit(): void {
    this.loadInterviews();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 

  loadInterviews(): void {
    this.interviewService.getAllInterviews().subscribe({
      next: (data) => {
        console.log('Fetched Interviews:', data);
        this.interviews = data;
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error Fetching Interviews:', error);
      }
    });
  }


  applyFilter() {
    const filterValues = {
      search: this.SearchQuery.trim().toLowerCase(),
      status: this.selectedStatus,
      date: this.selectedDate,
      from: this.fromTime,
      to: this.toTime
    };
  
    this.dataSource.filterPredicate = (data: Interview, filter: string) => {
      const filters = JSON.parse(filter);
  
      const matchesPanelMember =
        data.panelMemberName.toLowerCase().includes(filters.search) ||
        data.candidateName.toLowerCase().includes(filters.search) ||
        data.reportingManager.toLowerCase().includes(filters.search);
  
      const matchesStatus = filters.status === 'All' || data.status === filters.status;
  
      const backendDate = data.date?.split('T')[0];
      const matchesDate = !filters.date || backendDate === filters.date;
  
      const start = data.startTime?.slice(0, 5);
      const end = data.endTime?.slice(0, 5);
      const slotStart = this.toMinutes(start);
      const slotEnd = this.toMinutes(end);
  
      let matchesTime = true;
  
      if (filters.from && !filters.to) {
        const fromMinutes = this.toMinutes(filters.from);
        matchesTime = slotStart >= fromMinutes && slotStart <= fromMinutes + 10;
      } else if (!filters.from && filters.to) {
        const toMinutes = this.toMinutes(filters.to);
        matchesTime = slotEnd <= toMinutes && slotEnd >= toMinutes - 10;
      } else if (filters.from && filters.to) {
        const fromMinutes = this.toMinutes(filters.from);
        const toMinutes = this.toMinutes(filters.to);
        matchesTime = slotStart >= fromMinutes && slotEnd <= toMinutes;
      }
  
      return matchesPanelMember && matchesStatus && matchesDate && matchesTime;
    };
  
    this.dataSource.filter = JSON.stringify(filterValues);
  }
  
  
  
  toMinutes(time: string): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  }
  
    getStatusTooltip(status: string): string {
      switch (status) {
        case 'Request Cancellation':
          return 'Interview pending for approving cancel ';
        case 'Scheduled':
          return 'Interview is scheduled';
        case 'Available':
          return 'Panel member is available and slot is Approved';
        case 'Cancelled':
          return 'Slot was Cancelled by manager';
        case 'InProgress':
          return 'Slot is Locked by TaRecruiter for Scheduling';
        default:
          return 'Unknown status';
      }
    }
  
    resetFilters() {
      this.SearchQuery = '';
      this.selectedStatus = 'All';
      this.fromTime = '';
      this.toTime = '';
      this.selectedDate = ''; // if using date filter
      this.applyFilter();
    }
    

  cancelInterview(interviewId: string, status: string): void {
    const confirmed = confirm(`Are you sure you want to ${status.toLowerCase()} this interview?`);
    if (confirmed) {
      this.interviewService.updateInterviewStatus(interviewId, status).subscribe({
        next: () => {
          console.log(`Interview ${status}`);
          this.loadInterviews();
          this.interviews = this.interviews.map(interview =>
            interview.interviewId === interviewId
              ? { ...interview, status: status }
              : interview
          );
        },
        error: (error) => {
          console.error('Error Cancelling Interview:', error);
        }
      });
    }
  }

  
}
