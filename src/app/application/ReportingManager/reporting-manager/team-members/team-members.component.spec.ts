import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TeamMembersComponent } from './team-members.component';
import { ReportingManagerService } from '../../../../core/services/reporting-manager.service';
import { of, throwError } from 'rxjs';
import { SlotTA } from '../../../../shared/models/slotTA';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TeamMembersComponent', () => {
  let component: TeamMembersComponent;
  let fixture: ComponentFixture<TeamMembersComponent>;
  let mockService: jasmine.SpyObj<ReportingManagerService>;

  const mockSlotData: SlotTA[] = [
    {
      userId: '',
      slotId: '1',
      panelMemberName: 'John Doe',
      startTime: '10:00',
      endTime: '11:30',
      date: '2025-04-10T00:00:00',
      status: 'Initiated'
    },
    {
      userId: '',
      slotId: '2',
      panelMemberName: 'Hari',
      startTime: '10:00',
      endTime: '10:30',
      date: '2025-04-10T00:00:00',
      status: 'Available'
    }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ReportingManagerService', ['getTeamMembersSlot', 'updateSlotStatus']);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        FormsModule,
        NoopAnimationsModule,TeamMembersComponent
      ],
     
      providers: [
        { provide: ReportingManagerService, useValue: mockService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMembersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should load team members on init', () => {
    mockService.getTeamMembersSlot.and.returnValue(of(mockSlotData));

    component.ngOnInit();

    expect(mockService.getTeamMembersSlot).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });



  it('should apply filter correctly', fakeAsync(() => {
    mockService.getTeamMembersSlot.and.returnValue(of(mockSlotData));
  
    component.ngOnInit();
    tick(); // Wait for subscription to complete
  
    component.searchQuery = '';
    component.selectedStatus = 'Available'; 
    component.selectedDate = '';
    component.fromTime = '10:00';
    component.toTime = '11:00';
  
    component.applyFilter();
  
    expect(component.dataSource.data.length).toBe(1); // Data is filtered manually into dataSource.data
  }));


  

  it('should call updateStatus and reload data on success', fakeAsync(() => {
    mockService.getTeamMembersSlot.and.returnValue(of(mockSlotData));
    mockService.updateSlotStatus.and.returnValue(of(null));

    component.updateStatus('1', 'Available');
    tick();

    expect(mockService.updateSlotStatus).toHaveBeenCalledWith('1', 'Available');
    expect(component.isLoading).toBeFalse();
  }));



  it('should handle error when updateStatus fails', fakeAsync(() => {
    mockService.updateSlotStatus.and.returnValue(throwError(() => new Error('Server error')));

    component.updateStatus('1', 'Available');
    tick();

    expect(component.isLoading).toBeFalse();
  }));

  

  it('should reset filters', () => {
    component.searchQuery = 'abc';
    component.selectedStatus = 'Scheduled';
    component.fromTime = '10:00';
    component.toTime = '11:00';
    component.selectedDate = '2025-04-10';

    component.resetFilters();

    expect(component.searchQuery).toBe('');
    expect(component.selectedStatus).toBe('All');
    expect(component.fromTime).toBe('');
    expect(component.toTime).toBe('');
    expect(component.selectedDate).toBe('');
  });
});
