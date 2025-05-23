import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReportingManagerService } from '../../../../core/services/reporting-manager.service';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { SlotDetails } from '../../../../shared/models/slot-details';




@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, 
    FormsModule,MatTimepickerModule, MatIconModule,
    MatTooltipModule,MatFormFieldModule,MatInputModule],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['panelMemberName', 'startTime', 'endTime', 'date', 'status', 'actions'];
  dataSource = new MatTableDataSource<SlotDetails>([]);
  searchQuery = '';
  selectedDate = '';
  fromTime = ''; // format: "HH:mm"
  toTime = '';   // format: "HH:mm"
  selectedStatus = 'All';
  statuses: string[] = ['All', 'Scheduled', 'Initiated', 'Available', 'Cancelled','InProgress'];
  originalData: SlotDetails[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly managerService: ReportingManagerService) { }

  ngOnInit() {
    this.loadTeamMembers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadTeamMembers() {
    this.managerService.getTeamMembersSlot().subscribe((data: SlotDetails[]) => {
      console.log(data); // Debug info
      this.originalData = data;               // Keep a copy
      this.dataSource.data = [...data];       // Set initial full data
      this.applyFilter();                     // Apply filter if needed
    });
  }
  

  applyFilter() {
    const search = this.searchQuery.trim().toLowerCase();
    const status = this.selectedStatus;
    const selected = this.selectedDate;
    const from = this.fromTime;
    const to = this.toTime;
  
    const filteredData = this.originalData.filter((data: SlotDetails) => {
      const matchesSearch =
        data.panelMemberName.toLowerCase().includes(search);
  
      const matchesStatus = status === 'All' || data.status === status;
  
      const backendDate = data.date?.split('T')[0];
      const matchesDate = !selected || backendDate === selected;
  
      let matchesTime = true;
      if (from && to) {
        const slotStart = this.toMinutes(data.startTime);
        const fromMinutes = this.toMinutes(from);
        const toMinutesVal = this.toMinutes(to);
        matchesTime = slotStart >= fromMinutes && slotStart <= toMinutesVal;
      }
  
      return matchesSearch && matchesStatus && matchesDate && matchesTime;
    });
  
    this.dataSource.data = filteredData;
  }
  

  toMinutes(time: string): number {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  }
  
  getStatusTooltip(status: string): string {
    switch (status) {
      case 'Initiated':
        return 'Slot pending for approval ';
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
    this.searchQuery = '';
    this.selectedStatus = 'All';
    this.fromTime = '';
    this.toTime = '';
    this.selectedDate = ''; // if using date filter
    this.applyFilter();
  }

  


  isLoading = false;

  updateStatus(slotId: string, status: string) {
    console.log('Sending slotId:', slotId); // Add this
    this.isLoading = true;
    this.managerService.updateSlotStatus(slotId, status).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadTeamMembers();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}