import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockSlotModalComponent } from './lock-slot-modal.component';

describe('LockSlotModalComponent', () => {
  let component: LockSlotModalComponent;
  let fixture: ComponentFixture<LockSlotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockSlotModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockSlotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
