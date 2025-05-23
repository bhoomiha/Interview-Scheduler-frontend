import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewListComponent } from './interview-list.component';
import { InterviewService } from '../../../core/services/interview.service';
import { of } from 'rxjs';
import { Interview } from '../../../shared/models/interview';
 
describe('InterviewListComponent', () => {
  let component: InterviewListComponent;
  let fixture: ComponentFixture<InterviewListComponent>;
  let mockService: any;
 
  const mockData: Interview[] = [
    {
      interviewId: '1',
      candidateName: 'Alice',
      panelMemberName: 'John',
      reportingManager: 'RM1',
      date: '2025-04-25T00:00:00',
      startTime: '10:00',
      endTime: '11:00',
      status: 'Scheduled',
      slotId: ''
    }
  ];
 
  beforeEach(async () => {
    mockService = {
      getAllInterviews: jasmine.createSpy().and.returnValue(of(mockData)),
      updateInterviewStatus: jasmine.createSpy().and.returnValue(of({}))
    };
 
    await TestBed.configureTestingModule({
      imports: [InterviewListComponent],
      providers: [{ provide: InterviewService, useValue: mockService }]
    }).compileComponents();
 
    fixture = TestBed.createComponent(InterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('1️⃣ should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('2️⃣ should load interviews on init', () => {
    expect(mockService.getAllInterviews).toHaveBeenCalled();
    expect(component.interviews.length).toBe(1);
    expect(component.dataSource.data.length).toBe(1);
  });
 
  it('3️⃣ should apply search filter correctly', () => {
    component.SearchQuery = 'alice';
    component.applyFilter();
    expect(component.dataSource.filteredData.length).toBe(1);
  });
 
  it('4️⃣ should return tooltip message for Scheduled status', () => {
    const tooltip = component.getStatusTooltip('Scheduled');
    expect(tooltip).toBe('Interview is scheduled');
  });
 
  it('5️⃣ should return default tooltip for unknown status', () => {
    const tooltip = component.getStatusTooltip('UnknownStatus');
    expect(tooltip).toBe('Unknown status');
  });
 
  it('6️⃣ should reset all filters', () => {
    component.SearchQuery = 'test';
    component.selectedStatus = 'Scheduled';
    component.fromTime = '10:00';
    component.toTime = '11:00';
    component.selectedDate = '2025-04-25';
    component.resetFilters();
 
    expect(component.SearchQuery).toBe('');
    expect(component.selectedStatus).toBe('All');
    expect(component.fromTime).toBe('');
    expect(component.toTime).toBe('');
    expect(component.selectedDate).toBe('');
  });
 
  it('7️⃣ toMinutes should convert HH:mm to total minutes', () => {
    expect(component.toMinutes('10:15')).toBe(615);
  });
 
  it('8️⃣ toMinutes should return 0 if time is empty', () => {
    expect(component.toMinutes('')).toBe(0);
  });
 
  it('9️⃣ cancelInterview should call updateInterviewStatus when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.cancelInterview('1', 'Cancelled');
    expect(mockService.updateInterviewStatus).toHaveBeenCalledWith('1', 'Cancelled');
  });
});
 