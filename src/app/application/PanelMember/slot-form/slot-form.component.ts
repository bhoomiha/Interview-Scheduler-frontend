import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PanelMemberService } from '../../../core/services/panel-member.service';
import { PanelWindow } from '../../../shared/models/panel-window';
import { CreateSlotDTO } from '../../../shared/models/slot';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DateFilterFn,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-slot-form',
  templateUrl: './slot-form.component.html',
  styleUrls: ['./slot-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule
  ],
})
export class CreateSlotFormComponent implements OnInit {
  createSlotForm!: FormGroup;
  panelWindows: PanelWindow[] = [];
  availableDates: string[] = [];
  availableTimeSlots: string[] = [];
  availableDatesSet!: Set<string>;
  slotCreatedMessage = '';
  formSubmitted = false;
  filteredEndTimes: string[] = [];
  minDate!: Date;
  maxDate!: Date;



  constructor(
    private fb: FormBuilder,
    private panelMemberService: PanelMemberService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadPanelWindows();
    this.generateTimeSlots();
  }

    /**  Filters the date picker to allow only valid dates */
  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) return false;
    const formattedDate = date.toISOString().split('T')[0];
    return this.availableDates.includes(formattedDate.trim());
  };

    /**  Generates time slots in 24-hour format with 10-minute intervals */
  generateTimeSlots() {
    this.availableTimeSlots = [];
    for (let hour = 9; hour <= 19; hour++) {
      for (const minute of [0, 10, 20, 30, 40, 50]) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.availableTimeSlots.push(formattedTime);
      }
    }
  }

    /**  Updates end time dropdown options based on selected start time */
  updateEndTimeOptions() {
    const selectedStartTime = this.createSlotForm.get('startTime')?.value;
    if (!selectedStartTime) return;
  
    this.filteredEndTimes = this.availableTimeSlots.filter(time => time > selectedStartTime);
  
    if (!this.createSlotForm.get('endTime')?.value) {
      this.createSlotForm.patchValue({ endTime: this.filteredEndTimes[0] });
    }
  }  
  

  /**  Creates a reactive form with validations */
  createForm() {
    this.createSlotForm = this.fb.group({
      panelName: ['', Validators.required],
      date: ['', Validators.required], 
      skillSet: [{ value: '', disabled: true }],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],      
    });

      this.createSlotForm.get('panelName')?.valueChanges.subscribe((selectedPanelId) => {
        const selectedPanel = this.panelWindows.find(
          (p) => p.panelWindowId === selectedPanelId
        );
      
        if (selectedPanel) {
          const startDate = new Date(new Date(selectedPanel.startDate).setDate(new Date(selectedPanel.startDate).getDate() + 1));
          const endDate = new Date(new Date(selectedPanel.endDate).setDate(new Date(selectedPanel.endDate).getDate() + 1));
          
          this.availableDates = this.getDateRange(startDate, endDate);
          this.availableDatesSet = new Set(this.availableDates);
          this.minDate = startDate;
          this.maxDate = endDate;
      
          this.createSlotForm.patchValue({ skillSet: selectedPanel.skillSet });
        }
      });
      

    //  Auto-fill end time when start time is selected
    this.createSlotForm
      .get('startTime')
      ?.valueChanges.subscribe((startTime) => {
        if (startTime) {
          const [hour, minute] = startTime.split(':').map(Number);
          this.createSlotForm.patchValue({
            endTime: `${(hour + 1) % 24}:${minute.toString().padStart(2, '0')}`,
          });
          this.createSlotForm.get('endTime')?.enable();
        }
      });
  }

  /**  Fetches panel windows from the service */
  loadPanelWindows() {
    this.panelMemberService.getPanelWindows().subscribe({
      next: (data) => (this.panelWindows = data),
      error: (err) => console.error('Error fetching panel windows:', err),
    });
  }

    /**  Generates a date range based on panel availability */
  getDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate.getTime()+1);
    const adjustedEndDate = new Date(endDate.getTime()+1);

    while (currentDate <= adjustedEndDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  /**  Submits the form and creates a new slot */
  submitForm() {
    this.formSubmitted = true;
    this.createSlotForm.markAllAsTouched(); 
  
    if (this.createSlotForm.invalid) {
      console.log('Validation Failed:', this.createSlotForm.errors); 
      return; 
    }
  
    // Prepare slot data for submission
    const formValue = this.createSlotForm.getRawValue();
    const formattedDate = new Date(formValue.date);
const isoDateString = formattedDate.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"

  
    const generatedUuid = uuidv4();
    const slotData: CreateSlotDTO = {
      date: isoDateString,
      startTime: `${formValue.startTime}:00`,
      endTime: `${formValue.endTime}:00`,
      status: 'Initiated',
      userId: formValue.userId,
      slotId: generatedUuid,
    };
  
        // Send data to the API
    this.panelMemberService.createSlot(slotData).subscribe({
      next: () => {
        this.slotCreatedMessage = ' Slot created successfully!';
        this.formSubmitted = false;
        setTimeout(() => {
          this.slotCreatedMessage = '';
        }, 3000);
      },
      error: () => {
        this.slotCreatedMessage = ' Slot creation failed.';
        setTimeout(() => {
          this.slotCreatedMessage = '';
        }, 3000);
      },
    });
  }
  
  /**  Refreshes the slot table after a new slot is created */
  refreshSlotTable() {
    this.panelMemberService.getSlots().subscribe({
      next: (slots) => console.log('Updated Slots:', slots),
      error: (err) => console.error('Error fetching slots:', err),
    });
  }

  
}
