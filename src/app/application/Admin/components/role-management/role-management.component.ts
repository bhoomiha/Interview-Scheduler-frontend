import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../core/services/user.service';
import { Role } from '../../../../shared/Role';


@Component({
  standalone: true,
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RoleManagementComponent implements OnInit {
  roles: Role[] = [];
  newRole: Partial<Role> = {};
  activeTab: 'create' | 'list' = 'create';
  formSubmitted = false;


  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        this.toastr.error('Failed to load roles', 'Error');
        console.error(err);
      },
    });
  }

  createRole(): void {
    this.formSubmitted = true;
    if (!this.newRole.roleName) {
      this.toastr.error('Role name is required', 'Validation Error');
      return;
    }

     this.userService.createRole(this.newRole.roleName).subscribe({
      next: () => {
        this.toastr.success('Role created successfully', 'Success');
        this.newRole = {};
        this.formSubmitted = false;
        this.loadRoles();
      },
      error: (err) => {
        this.toastr.error('Role already exists', 'Error');
        console.error(err);
      },
    });
  }

  setActiveTab(tab: 'create' | 'list'): void {
    this.activeTab = tab;
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }
}
