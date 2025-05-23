import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAAdminComponentComponent } from './taadmin-component.component';

describe('TAAdminComponentComponent', () => {
  let component: TAAdminComponentComponent;
  let fixture: ComponentFixture<TAAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TAAdminComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TAAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
