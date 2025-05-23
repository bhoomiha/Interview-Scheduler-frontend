import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TARecruiterComponent } from './tarecruiter.component';

describe('TARecruiterComponent', () => {
  let component: TARecruiterComponent;
  let fixture: ComponentFixture<TARecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TARecruiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TARecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
