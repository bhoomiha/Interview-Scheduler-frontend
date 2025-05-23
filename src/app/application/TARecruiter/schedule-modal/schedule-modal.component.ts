import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { InterviewService } from '../../../core/services/interview.service';
import { ScheduleInterview } from '../../../shared/models/schedule-interview';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SlotAvailabilityService } from '../../../core/services/slot-availability.service';
import { SlotTA } from '../../../shared/models/slotTA';
import { customAlert } from '../../../shared/models/alert-util';



@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-screen-lg">
  <h2 class="text-xl font-bold mb-4">Schedule Interview</h2>

  <!--  Panel Member Info Section -->
  <div *ngIf="panelMember" class="mb-4 p-4 border border-gray-300 rounded bg-gray-100">
    <h3 class="text-lg font-semibold">Panel Member Details</h3>
    <p><strong>Name:</strong> {{ panelMember.name }}</p>
    <p><strong>Skill:</strong> {{ panelMember.skillSet }}</p>
    <p><strong>Experience:</strong> {{ panelMember.experience }} years</p>
  </div>

  <!--  Candidate Selection Table with Search -->
  <div *ngIf="!selectedCandidateId && !isPastDate" class="mb-4">
    <label class="block mb-2 font-medium">Select Candidat:</label>

    <!--  Search Filters + Reset (Same Row, Responsive) -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 items-center mb-4">
  <input type="text" [(ngModel)]="nameFilter" placeholder="Name"
         class="p-1.5 text-sm border border-gray-300 rounded" />

  <input type="text" [(ngModel)]="skillFilter" placeholder="Skill"
         class="p-1.5 text-sm border border-gray-300 rounded" />

  <input type="number" [(ngModel)]="experienceFilter" placeholder="Experience"
         class="p-1.5 text-sm border border-gray-300 rounded" />

  <!--  Reset Button inside grid -->
  <button (click)="resetFilters()"
          class="p-1.5 text-sm bg-gradient-to-t from-[#9b6fa5] to-[#7a4c8f] text-white rounded ">
    Reset Filters
  </button>
</div>


    <!--  Candidate Table -->
    <div class="overflow-auto max-h-64 border border-gray-300 rounded">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-200 sticky top-0">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Skill</th>
            <th class="px-4 py-2">Experience</th>
            <th class="px-4 py-2">Select</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let candidate of filteredCandidates()" class="hover:bg-gray-100">
            <td class="px-4 py-2">{{ candidate.name }}</td>
            <td class="px-4 py-2">{{ candidate.skill }}</td>
            <td class="px-4 py-2">{{ candidate.experience }} yrs</td>
            <td class="px-4 py-2">
              <button (click)="selectCandidate(candidate.userId)" class="px-3 py-1 bg-gradient-to-t from-[#9b6fa5] to-[#7a4c8f]  text-white rounded">
                Select
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Selected Candidate Info (Detailed) -->
<div *ngIf="selectedCandidateId" class="mb-4 p-4 border border-green-300 rounded bg-green-50">
  <h3 class="text-md font-semibold text-green-700 mb-2">Selected Candidate</h3>
  <div *ngIf="selectedCandidate">
    <p><strong>Name:</strong> {{ selectedCandidate.name }}</p>
    <p><strong>Skill:</strong> {{ selectedCandidate.skill }}</p>
    <p><strong>Experience:</strong> {{ selectedCandidate.experience }} years</p>
  </div>
  <p class="mt-2 text-blue-600 underline cursor-pointer" (click)="selectedCandidateId = null">Change Candidate</p>
</div>


  <!-- Action Buttons -->
<div class="flex justify-between items-center mt-4">
  <!-- Show message if date is past -->
  <p *ngIf="isPastDate" class="text-red-600 font-medium">
    Cannot allocate for past dates
  </p>

  <div class="flex space-x-2">
    <button class="px-4 py-2 bg-gradient-to-t from-[#9b6fa5] to-[#7a4c8f] text-white rounded"
            (click)="dialogRef.close()">Cancel</button>

    <!-- Show Schedule button only if not past date -->
    <button *ngIf="!isPastDate"
            class="px-4 py-2 bg-gradient-to-t from-[#9b6fa5] to-[#7a4c8f] text-white rounded"
            (click)="schedule()">Schedule</button>
  </div>
</div>


  `,
})
export class ScheduleModalComponent implements OnInit {
  candidates: any[] = [];
  selectedCandidateId: string | null = null;
  panelMember: any;
  selectedSlot: any;
  errorMessage: string | null = null;
  showCandidates: boolean = true;
  slots: SlotTA[] = [];
  selectedCandidate: any = null;
  nameFilter: string = '';
  skillFilter: string = '';
  experienceFilter: string | null = null;
  isPastDate: boolean = false;


  constructor(
    private readonly router: Router,
    private readonly interviewService: InterviewService,
    private readonly userService: UserService,
    private readonly slotservice: SlotAvailabilityService,
    public dialogRef: MatDialogRef<ScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.panelMember = this.data.panelMember;  //  Assign Panel Member
    this.selectedSlot = this.data.slot;        //  Assign Slot
    const slotDate = new Date(this.selectedSlot.date);  // assume `date` is the property holding the slot date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize today's time to midnight
    slotDate.setHours(0, 0, 0, 0); // normalize slot time

    if (slotDate >= today) {
      this.loadCandidates();
      this.isPastDate = false;
    } else {
      this.showCandidates = false;
      this.isPastDate = true;
    }
  }

  loadCandidates(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.candidates = users.filter(user => user.roleName === 'Candidate');
      },
      error: (error) => console.error('Error fetching candidates:', error),
    });
  }



  schedule(): void {
    if (!this.selectedCandidateId) {
      customAlert('Select a candidate.');
      return;
    }

    const model: ScheduleInterview = {
      slotId: this.selectedSlot.slotId,
      candidateId: this.selectedCandidateId,
      status: 'Scheduled',
    };

    this.interviewService.scheduleInterview(model).subscribe({
      next: () => {
        this.router.navigate(["/ta-recruiter/scheduled-interviews"]);
        this.selectedSlot.status = '';
        this.selectedSlot = null;
        this.selectedCandidateId = null;
        this.showCandidates = false; // Reset candidate list after scheduling
        customAlert('Interview Scheduled Successfully!');
        this.dialogRef.close();


      },
      error: (err) => {
        console.error('Error scheduling interview:', err);

        // Check for different error structures
        if (err.error?.errors?.length) {
          customAlert(err.error.errors.join(', '));  // Join errors if it's an array
        } else if (err.error?.message) {
          customAlert(err.error.message);  // Display the error message directly
        } else if (err.message) {
          customAlert(err.message);  // General error message
        } else {
          customAlert('An unknown error occurred while scheduling the interview.');
        }
      }
    });
  }



  filteredCandidates() {
    return this.candidates.filter(c => {
      const matchesName = !this.nameFilter || c.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesSkill = !this.skillFilter || c.skill?.toLowerCase().includes(this.skillFilter.toLowerCase());
      const matchesExperience = this.experienceFilter === null || this.experienceFilter === '' || c.experience == this.experienceFilter;
      return matchesName && matchesSkill && matchesExperience;
    });
  }


  selectCandidate(userId: string) {
    this.selectedCandidateId = userId;
    this.selectedCandidate = this.candidates.find(c => c.userId === userId);

    // Optionally clear filters
    this.nameFilter = '';
    this.skillFilter = '';
    this.experienceFilter = null;
  }

  resetFilters() {
    this.nameFilter = '';
    this.skillFilter = '';
    this.experienceFilter = null;
  }
}
