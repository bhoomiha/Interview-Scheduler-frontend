import { Component } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { SlotAvailabilityService } from '../../../core/services/slot-availability.service';
import { AuthService } from '../../../core/services/auth.service';
import { SlotTA } from '../../../shared/models/slotTA';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelMember } from '../../../shared/models/panel-member.model';
import { PanelCoordinatorService } from '../../../core/services/panel-coordinator.service';
import { PanelMemberModalComponent } from '../panel-member-modal/panel-member-modal.component';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { customAlert } from '../../../shared/models/alert-util';

 
@Component({
  selector: 'app-slot-list',
  imports: [CommonModule, FormsModule, MatIconModule, NgxPaginationModule],
  templateUrl: './slot-list.component.html',
  styleUrl: './slot-list.component.scss'
})
 
 
export class SlotListComponent {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  slots: SlotTA[] = [];
  currentUserId: string | null = null;
  panelMembers: PanelMember[] = []; // Store all panel members
  filteredSlots: SlotTA[] = [];
  unScheduledSlots: SlotTA[] = [];
  hoursList: string[] = []; // 24-hour format
  minutesList: string[] = []; // Only 00 and 30
  userToken: string | null = null;
  levels: string[] = ['L0', 'L1', 'L2', 'L3'];
  selected:boolean = true;
  statusOptions: string[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  activeButton: 'unscheduled' | 'lockedByMe' = 'unscheduled';


 
  filters = {
    name: '',
    level: '',
  windowName: '',
    date: '',
    startHour: '',
  startMinute: '',
  endHour: '',
  endMinute: '',
    status: ''
  };
  
  constructor(
    private readonly interviewService: InterviewService,
    private readonly slotservice: SlotAvailabilityService,
    private readonly authService: AuthService,
    private readonly panelcoordinatorService : PanelCoordinatorService,
    private readonly dialog: MatDialog
  ) {}
 
  ngOnInit(): void {
     const currentUser = this.authService.getCurrentUser();
     this.userToken = currentUser?.accessToken ?? null;  // Extract token from user object
     this.currentUserId = this.extractUserIdFromToken(this.userToken); // Decode token to get userId
     console.log("Extracted User ID:", this.currentUserId); // Debugging log
     this.generateTimeLists();
     this.loadSlot();
  }
  

 
  extractUserIdFromToken(token: string | null): string | null {
    if (!token || typeof token !== 'string') return null;  // Ensure token is valid
  
    try {
      const payload = token.split('.')[1];  // Extract payload
      const decodedPayload = atob(payload);  // Decode Base64
      const decodedToken = JSON.parse(decodedPayload);  // Convert to JSON
  
      return  decodedToken.nameid;  // Get userId
    } catch (e) {
      console.error('Invalid token format', e);
      return null;
    }
  }
  

  loadSlot() {
    this.slotservice.getAllSlot().subscribe({
      next: (data) => {
        console.log('Fetched Slots:', data);
        this.slots = data;
        this.sortSlotsByDate(); 
        this.filterSlots();
      },
      error: (error) => {
        console.error('Error Fetching Slots:', error);
      }
    });
  }

  generateTimeLists(): void {
    // Generate hours from 09 to 19
    for (let i = 9; i <= 19; i++) {
      this.hoursList.push(i.toString().padStart(2, '0'));
    }
  
    // Generate minutes: 00, 10, 20, 30, 40, 50
    for (let i = 0; i <= 50; i += 10) {
      this.minutesList.push(i.toString().padStart(2, '0'));
    }
  }
 
  filterSlots(): void {
    this.activeButton = 'unscheduled';
    this.selected = true;
    this.updateStatusOptions();
    this.applyFilters();
  }
  filterLockedByMe(): void {
    this.activeButton = 'lockedByMe';
    this.selected = false;
    this.updateStatusOptions();
    this.applyFilters();
  }
  
  updateStatusOptions(): void {
    this.filters.status = ''; // Reset filter when switching
    this.statusOptions = this.selected
      ? ['Available', 'InProgress', 'Cancelled']    // Unscheduled
      : ['Scheduled', 'InProgress', 'Cancelled'];   // Locked By Me
  }

  applyFilters(): void {
    if (this.selected) {
      this.unScheduledSlots = this.getFilteredSlots();
    } else {
      this.filteredSlots = this.getFilteredSlots();
    }
  }
  getFilteredSlots(): SlotTA[] {
    const filterStartTime = this.filters.startHour && this.filters.startMinute
      ? this.convertTimeToMinutes(`${this.filters.startHour}:${this.filters.startMinute}`)
      : null;
  
    const filterEndTime = this.filters.endHour && this.filters.endMinute
      ? this.convertTimeToMinutes(`${this.filters.endHour}:${this.filters.endMinute}`)
      : null;
  
    let baseSlots = this.slots;
  
    if (this.selected) {
      baseSlots = baseSlots.filter(slot => slot.status === 'Available' || slot.status === 'InProgress');
    }
    else{
      baseSlots = baseSlots.filter(slot => slot.lockedBy === this.currentUserId);
    }
  
    return baseSlots.filter(slot =>
      (!this.filters.name || slot.panelMemberName.toLowerCase().includes(this.filters.name.toLowerCase())) &&
      (!this.filters.date || slot.date.split('T')[0] === this.filters.date) &&
      (!this.filters.status || slot.status === this.filters.status) &&
      (!this.filters.level || slot.level === this.filters.level) &&
      (!this.filters.windowName || (slot.panelWindow && slot.panelWindow.toLowerCase().includes(this.filters.windowName.toLowerCase()))) &&
      this.matchTimeFilter(slot.startTime, slot.endTime, filterStartTime, filterEndTime)
    );
  }
    
 
  matchTimeFilter(startTime: string, endTime: string, filterStart: number | null, filterEnd: number | null): boolean {
    const slotStartTime = this.convertTimeToMinutes(startTime);
    const slotEndTime = this.convertTimeToMinutes(endTime);
 
    return (
      // If only start time is given, show all slots that start at or after that time (within 30 min)
      (!filterStart || (slotStartTime == filterStart && slotStartTime == filterStart )) &&
 
      // If only end time is given, show all slots that end at or before that time (within 30 min)
      (!filterEnd || (slotEndTime == filterEnd  && slotEndTime == filterEnd ))
    );
  }
 
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
 
 
  toggleLock(slot: SlotTA) {
    if (slot.status == 'Scheduled'){customAlert('This slot is already scheduled');}
    if (slot.lockedBy && slot.lockedBy !== this.currentUserId) {
      customAlert('This slot is locked by another user.');
      return;
    }
    console.log(this.currentUserId);
    console.log("Locking slot with payload:", { slotId: slot.slotId });
  this.interviewService.lockSlot({ slotId: slot.slotId }).subscribe({
    next: (response) => {
      console.log('Slot status updated successfully:', response);
      if (response.message === 'Slot status updated successfully.'){
        slot.status = slot.status === 'Available' ? 'InProgress' : 'Available';
        slot.lockedBy = slot.status === 'InProgress' ? this.currentUserId : null;
 
      }
   
    },
    error: (err) => {
      if (err.error?.errors?.length) {
      customAlert(err.error.errors[0]);}
      console.error('Error updating slot status:', err);
    },
    complete: () => {
      console.log('Locking process completed');
    }
  });
  } 
 
  openPanelDetails(slot: SlotTA): void {
    this.panelcoordinatorService.getAllPanelMembers().subscribe((panelMembers) => {
      const panelMember = panelMembers.find((member) => member.name === slot.panelMemberName);
       console.log(panelMember);
      if (panelMember) {
        this.dialog.open(PanelMemberModalComponent, {
          data: panelMember,  
          width: '400px',
        });
      } else {
        customAlert('Panel Member not found.');
      }
    });
  }
 
  openScheduleModal(slot: SlotTA): void {
    if (slot.lockedBy !== this.currentUserId) {
      customAlert('You must lock the slot first.');
      return;
    }
 
    this.panelcoordinatorService.getAllPanelMembers().subscribe({
      next: (data) => {
        const panelMember = data.find((member) => member.name === slot.panelMemberName) || null;
        //  Pass both `slot` and `panelMember` when opening the modal
        this.dialog.open(ScheduleModalComponent, {
          data: { slot: slot, panelMember: panelMember }  
          
        });
      },
      error: (error) => {
        console.error(error);
        
      }
    });
  }
 
 
  resetFilters(): void {
    this.filters = {
      name: '',
      level: '',
  windowName: '',
      date: '',
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      status: ''
    };
    this.applyFilters();
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
 
  sortSlotsByDate(): void {
  const today = new Date().setHours(0, 0, 0, 0);

  this.slots.sort((a, b) => {
    const dateA = new Date(a.date).setHours(0, 0, 0, 0);
    const dateB = new Date(b.date).setHours(0, 0, 0, 0);

    // Sort logic: Upcoming dates first, then past dates
    if (dateA >= today && dateB >= today) {
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (dateA < today && dateB < today) {
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // Prioritize upcoming dates over past dates
    return dateA >= today ? -1 : 1;
  });
}

toggleSortOrder(): void {
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  this.sortSlotsByDate();
    this.applyFilters();  // Re-filter and update visible list

}
 
 
}