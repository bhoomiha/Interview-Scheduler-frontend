import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlotFormComponent } from './slot-form.component';

describe('SlotFormComponent', () => {
  let component: CreateSlotFormComponent;
  let fixture: ComponentFixture<CreateSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSlotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
