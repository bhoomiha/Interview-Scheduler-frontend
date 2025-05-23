import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelWindowsComponent } from './panel-windows.component';

describe('PanelWindowsComponent', () => {
  let component: PanelWindowsComponent;
  let fixture: ComponentFixture<PanelWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelWindowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
