import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TADashboardComponent } from './tadashboard.component';

describe('TADashboardComponent', () => {
  let component: TADashboardComponent;
  let fixture: ComponentFixture<TADashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TADashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TADashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
