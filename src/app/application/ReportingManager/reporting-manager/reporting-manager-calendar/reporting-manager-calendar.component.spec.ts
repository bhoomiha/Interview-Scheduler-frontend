import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingManagerCalendarComponent } from './reporting-manager-calendar.component';

describe('ReportingManagerCalendarComponent', () => {
  let component: ReportingManagerCalendarComponent;
  let fixture: ComponentFixture<ReportingManagerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingManagerCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingManagerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
