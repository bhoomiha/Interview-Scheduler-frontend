import { Component, OnDestroy } from '@angular/core';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { PanelWindow } from '../../../../shared/models/panel-window';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // for native date adapter
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-allocate-panel-window',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './allocate-panel-window.component.html',
  styleUrls: ['./allocate-panel-window.component.scss']
})
export class AllocatePanelWindowComponent implements OnDestroy {
  
  panelWindowName = '';
  startDate = '';
  endDate = '';
  skillSet = '';

  successMessage = '';
  errorMessage = '';
  panelServiceSubscription!: Subscription;

  constructor(private readonly panelService: PanelCoordinatorService,private readonly router : Router) {}

  /** Submit Panel Window DTO */
  submitAllocation() {
    if (!this.panelWindowName || !this.startDate || !this.endDate || !this.skillSet) {
      this.errorMessage = "All fields are required!";
      return;
    }

    const panelWindow: PanelWindow = {
      panelWindowId:uuidv4(), // Generate or set this if required
      panelWindowName: this.panelWindowName,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      skillSet: this.skillSet
    };
    console.log('Sending PanelWindow:', panelWindow);


    this.successMessage = '';
    this.errorMessage = '';

    this.panelServiceSubscription = this.panelService.allocatePanelWindow(panelWindow).subscribe({
      next: (response) => {
        this.successMessage = response?.message?.[0]??"Panel window allocated successfully!";
        this.router.navigate(['/panel-coordinator/panel-windows']);
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); 
        
      },
      error: (error) => {
        console.error('Error Allocating:', error);
        this.errorMessage = `${error?.error?.errors ?? 'Unknown error'}`;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  /** Clear form fields */
  clearForm() {
    this.panelWindowName = '';
    this.startDate = '';
    this.endDate = '';
    this.skillSet = '';
  }

  ngOnDestroy() {
    if (this.panelServiceSubscription) {
      this.panelServiceSubscription.unsubscribe();
    }
  }
}
