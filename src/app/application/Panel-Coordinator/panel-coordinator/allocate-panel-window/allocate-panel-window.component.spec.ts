import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePanelWindowComponent } from './allocate-panel-window.component';

describe('AllocatePanelWindowComponent', () => {
  let component: AllocatePanelWindowComponent;
  let fixture: ComponentFixture<AllocatePanelWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocatePanelWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocatePanelWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
