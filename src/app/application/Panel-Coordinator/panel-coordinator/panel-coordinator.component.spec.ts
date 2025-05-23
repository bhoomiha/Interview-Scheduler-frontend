import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCoordinatorComponent } from './panel-coordinator.component';

describe('PanelCoordinatorComponent', () => {
  let component: PanelCoordinatorComponent;
  let fixture: ComponentFixture<PanelCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCoordinatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
