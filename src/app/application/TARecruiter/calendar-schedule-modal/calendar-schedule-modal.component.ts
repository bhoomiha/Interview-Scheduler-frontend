import { Component, Inject } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleInterview } from '../../../shared/models/schedule-interview';

@Component({
  selector: 'app-calendar-schedule-modal',
  imports: [],
  templateUrl: './calendar-schedule-modal.component.html',
  styleUrl: './calendar-schedule-modal.component.scss'
})
export class CalendarScheduleModalComponent {
  candidateId: string = '';
  selectedCandidateId: any;
  selectedSlot: any;

  constructor(
    public dialogRef: MatDialogRef<ScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly interviewService: InterviewService
  ) {}

  scheduleInterview(): void {
    if (!this.candidateId) return;

    const model: ScheduleInterview = {
          slotId: this.selectedSlot.slotId,
          candidateId: this.selectedCandidateId,
          status: 'Scheduled',
        };

    this.interviewService.scheduleInterview(model).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Error scheduling interview:', err)
    });
  }
}
