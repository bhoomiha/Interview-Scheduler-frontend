import { Component, Inject } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SlotTA } from '../../../shared/models/slotTA';
import { customAlert } from '../../../shared/models/alert-util';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-lock-slot-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template:`<div class="modal-container bg-white   p-6 w-[350px]  mx-auto">
  <h3 class="text-center text-lg font-semibold text-purple-800 mb-2">Lock Slot</h3>

  <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">Panel Member Details</h2>
  
  <div class="text-gray-700 space-y-1 mb-4">
    <p><strong>Name:</strong> {{ panelMember.name }}</p>
    <p><strong>Skill:</strong> {{ panelMember.skillSet }}</p>
    <p><strong>Experience:</strong> {{ panelMember.experience }} years</p>
  </div>
  <p *ngIf="isPastDate" class="text-center text-red-600 text-sm mb-4">
    Cannot lock past dates.
  </p>

  <p *ngIf="!isPastDate" class="text-center text-gray-600 mb-4">
    Are you sure you want to lock this slot?
  </p>

  <div class="modal-actions flex justify-center gap-4">
    <button 
      *ngIf="!isPastDate"
      class="lock-btn bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90"
      (click)="lockSlot(slot)"
    >
      Lock
    </button>

    <button 
      class="cancel-btn bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300"
      (click)="dialogRef.close()"
    >
      Cancel
    </button>
  </div>
</div>
`
  
})
export class LockSlotModalComponent {
  slot: any ;
  panelMember: any;
  isPastDate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LockSlotModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly interviewService: InterviewService
  ) {}

  ngOnInit(): void{
    this.slot = this.data.slot;
    this.panelMember = this.data.panelMember;
    this.isPastDate = new Date(this.slot.date) < new Date(new Date().toDateString());

  }

  lockSlot(slot: SlotTA): void {
    if(this.isPastDate){customAlert("Cannot allot for past dates");}
    console.log("panel member", this.panelMember);
    this.interviewService.lockSlot({ slotId: slot.slotId }).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        if (err.error?.errors?.length) {
      customAlert(err.error.errors[0]);}
        
      }
    });}
}
