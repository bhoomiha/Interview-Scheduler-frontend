import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCalendarComponent } from './panel-member-calendar.component';

describe('PanelMemberCalendarComponent', () => {
  let component: PanelCalendarComponent;
  let fixture: ComponentFixture<PanelCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
