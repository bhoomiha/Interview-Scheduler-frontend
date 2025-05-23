import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleManagementComponent } from './role-management.component';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../../shared/Role';

describe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getRoles', 'createRole']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['error', 'success']);

    await TestBed.configureTestingModule({
      imports: [RoleManagementComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRoles on ngOnInit', () => {
    const roles: Role[] = [{ roleId: 1, roleName: 'Admin' }];
    mockUserService.getRoles.and.returnValue(of(roles));

    fixture.detectChanges(); // Triggers ngOnInit

    expect(mockUserService.getRoles).toHaveBeenCalled();
    expect(component.roles()).toEqual(roles);
  });

  it('should handle error when loadRoles fails', () => {
    const consoleSpy = spyOn(console, 'error');
    mockUserService.getRoles.and.returnValue(throwError(() => new Error('Load error')));

    component.loadRoles();

    expect(mockToastr.error).toHaveBeenCalledWith('Failed to load roles', 'Error');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should not create role if roleName is missing', () => {
    component.newRole = {};
    component.createRole();

    expect(mockUserService.createRole).not.toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalledWith('Role name is required', 'Validation Error');
  });

  it('should create role and reload roles on success', () => {
    const loadSpy = spyOn(component, 'loadRoles');
    component.newRole = { roleName: 'HR' };
    mockUserService.createRole.and.returnValue(of({}));

    component.createRole();

    expect(mockUserService.createRole).toHaveBeenCalledWith('HR');
    expect(mockToastr.success).toHaveBeenCalledWith('Role created successfully', 'Success');
    expect(component.newRole).toEqual({});
    expect(component.formSubmitted).toBeFalse();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should show error if createRole fails', () => {
    const consoleSpy = spyOn(console, 'error');
    component.newRole = { roleName: 'Manager' };
    mockUserService.createRole.and.returnValue(throwError(() => new Error('Create error')));

    component.createRole();

    expect(mockToastr.error).toHaveBeenCalledWith('Failed to create role', 'Error');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should change active tab', () => {
    component.setActiveTab('list');
    expect(component.activeTab()).toBe('list');

    component.setActiveTab('create');
    expect(component.activeTab()).toBe('create');
  });
});
