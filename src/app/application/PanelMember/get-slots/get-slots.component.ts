import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PanelMemberService } from '../../../core/services/panel-member.service';
import { Slot } from '../../../shared/models/slot';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { SlotAvailabilityService } from '../../../core/services/slot-availability.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-get-slots',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatTooltip, MatIconModule, MatOptionModule],
  templateUrl: './get-slots.component.html',
  styleUrl: './get-slots.component.scss'
})
export class GetSlotsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'startTime', 'endTime', 'status', 'actions'];
  dataSource: MatTableDataSource<Slot> = new MatTableDataSource<Slot>([]);
  originalData: Slot[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue = '';
  selectedStatus = 'All';
  statuses: string[] = [ 'Scheduled', 'Available', 'Completed', 'Initiated', 'Cancelled', 'Request Cancellation'];
  successMessage = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  showLegend = false;


  constructor(
    private panelService: PanelMemberService,
    private slotAvailabilityService: SlotAvailabilityService
  ) {}

  // Lifecycle hook: load slots on component initialization
  ngOnInit() {
    this.loadSlots();
  }

  // Lifecycle hook: assign sort and paginator after view initializes
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Fetch all slots from the backend and bind to the table
  loadSlots() {
    this.panelService.getSlots().subscribe({
      next: (data: Slot[]) => {
        this.originalData = data;
        this.dataSource.data = [...data];
      },
      error: (error) => console.error(' Error fetching slots:', error)
    });
  }
  
  // Cancel a slot if eligible and update the backend
  cancelSlot(slot: Slot) {
    if (!this.canCancel(slot)) return;
  
    this.slotAvailabilityService.updateSlotStatus(slot.slotId, 'Cancelled').subscribe({
      next: () => {
        console.log(' Slot marked as Cancelled:', slot.slotId);
        slot.status = 'Cancelled';
        this.successMessage = ' Slot successfully cancelled!';
        setTimeout(() => (this.successMessage = ''), 3000);
  
        this.loadSlots(); 
        
        this.dataSource.data = [...this.dataSource.data]; 
      },
      error: (error) => {
        console.error(' Error canceling slot:', error);
      }
    });
  }

  // Request cancellation for a scheduled slot if more than 2 days in advance
  requestCancellation(slot: Slot) {
    if (!this.canRequestCancellation(slot)) return;

    const today = new Date();
    const slotDate = new Date(slot.date);
    const timeDiff = slotDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff <= 2) {
      this.successMessage = " Cannot request cancellation within 2 days of interview.";
      setTimeout(() => (this.successMessage = ''), 3000);
      return;
    }

    this.slotAvailabilityService.updateSlotStatus(slot.slotId, 'Request Cancellation').subscribe({
      next: () => {
        slot.status = 'Request Cancellation';
        this.successMessage = ' Cancellation request submitted!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.dataSource.data = [...this.dataSource.data];
        this.loadSlots();
      },
      error: (error) => {
        console.error(' Error requesting cancellation:', error);
      }
    });
  }

  // Check if the slot can be directly cancelled
  canCancel(slot: Slot): boolean {
    return slot.status === 'Available' || slot.status === 'Initiated';
  }

  // Check if cancellation request is allowed for a slot
  canRequestCancellation(slot: Slot): boolean {
    const today = new Date();
    const slotDate = new Date(slot.date);
    const timeDiff = slotDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return slot.status === 'Scheduled' && daysDiff > 2;
  }
  
  // Filter slots based on selected status and date range
  applyFilter() {
    this.dataSource.data = this.originalData.filter(slot => {
      const slotDate = new Date(slot.date); 
  
      const matchesStatus =
        this.selectedStatus === 'All' || slot.status === this.selectedStatus;
  
      const matchesStartDate =
        !this.startDate || slotDate >= this.startDate;
  
      const matchesEndDate =
        !this.endDate || slotDate <= this.endDate;
  
      return matchesStatus && matchesStartDate && matchesEndDate;
    });
  }

  // Return tooltip message based on slot status
  getStatusTooltip(status: string): string {
    switch (status) {
      case 'Available':
        return 'Slot is open for booking.';
      case 'Scheduled':
        return 'Slot is scheduled and confirmed.';
      case 'Initiated':
        return 'Slot process has started.';
      case 'Cancelled':
        return 'Slot has been cancelled.';
      case 'Request Cancellation':
        return 'Cancellation request is pending approval.';
      case 'InProgress':
        return 'Slot is currently in progress.';
      default:
        return 'Status unknown or not defined.';
    }
  }  
  
  // Toggle display of the status legend
  toggleLegend() {
    this.showLegend = !this.showLegend;
  }
}

