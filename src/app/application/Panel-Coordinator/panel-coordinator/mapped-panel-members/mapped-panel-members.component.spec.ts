import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedPanelMembersComponent } from './mapped-panel-members.component';

describe('MappedPanelMembersComponent', () => {
  let component: MappedPanelMembersComponent;
  let fixture: ComponentFixture<MappedPanelMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MappedPanelMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappedPanelMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
