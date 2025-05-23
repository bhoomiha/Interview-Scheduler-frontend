import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-panel-member-modal',
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg">
  <h2 class="text-xl font-bold mb-4">Panel Member Details</h2>
  <p><strong>Name:</strong> {{ data.name }}</p>
  <p><strong>Skill:</strong> {{ data.skillSet }}</p>
  <p><strong>Experience:</strong> {{ data.experience }} years</p>
  <button class="mt-4 px-4 py-2 bg-[#9b6fa5] text-white rounded" mat-button (click)="close()">Close</button>
</div>

  `,
})
export class PanelMemberModalComponent {
  constructor(public dialogRef: MatDialogRef<PanelMemberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
