import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPanelMembersComponent } from './all-panelmembers.component';

describe('AllPanelmembersComponent', () => {
  let component: AllPanelMembersComponent;
  let fixture: ComponentFixture<AllPanelMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPanelMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPanelMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
