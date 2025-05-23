import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPanelMemberComponent } from './map-panel-member.component';

describe('MapPanelMemberComponent', () => {
  let component: MapPanelMemberComponent;
  let fixture: ComponentFixture<MapPanelMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPanelMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPanelMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
