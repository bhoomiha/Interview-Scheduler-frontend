import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSlotsComponent } from './get-slots.component';

describe('GetSlotsComponent', () => {
  let component: GetSlotsComponent;
  let fixture: ComponentFixture<GetSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
