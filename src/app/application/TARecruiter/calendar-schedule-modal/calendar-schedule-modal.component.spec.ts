import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarScheduleModalComponent } from './calendar-schedule-modal.component';

describe('CalendarScheduleModalComponent', () => {
  let component: CalendarScheduleModalComponent;
  let fixture: ComponentFixture<CalendarScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarScheduleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
