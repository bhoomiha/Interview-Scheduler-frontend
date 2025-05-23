import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMemberComponent } from './panel-member.component';

describe('PanelMemberComponent', () => {
  let component: PanelMemberComponent;
  let fixture: ComponentFixture<PanelMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
