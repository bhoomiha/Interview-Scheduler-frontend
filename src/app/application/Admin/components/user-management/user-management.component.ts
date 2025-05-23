import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  roles: { roleId: number; roleName: string }[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  loading = false;
  formSubmitted = false;
  showCreateUserForm = true;
  showUsersList = false;
  showEditModal = false;
  searchKey = '';
  activeSection: 'get' | 'create' = 'get';
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  newUser: User = {
    name: '',
    email: '',
    designation: '',
    skill: '',
    reportingManager: '',
    experience: null as unknown as number,
    roleId: null as unknown as number,
  };

  editingUser: User = {
    userId: '',
    name: '',
    email: '',
    designation: '',
    skill: '',
    reportingManager: '',
    experience: 0,
    roleId: 0,
  };

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load users', 'Error');
        this.loading = false;
      },
    });
  }

  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (rolesData) => {
        this.roles = rolesData;
      },
      error: () => this.toastr.error('Failed to load roles', 'Error'),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showSection(section: 'get' | 'create') {
    this.activeSection = section;
  }

  createUser() {
    this.formSubmitted = true;
    if (!this.newUser.name || !this.newUser.email) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.toastr.success('User created successfully!', 'Success');
        this.newUser = {
          name: '',
          email: '',
          designation: '',
          skill: '',
          reportingManager: '',
          experience: null as unknown as number,
          roleId: null as unknown as number,
        };
        this.formSubmitted = false;
        this.activeSection = 'get';
        this.loadUsers();
      },
      error: (err) => (this.errorMessage = err.error.errors || 'Error creating user'),
    });
  }

  openEditUserModal(user: User) {
    this.editingUser = { ...user };
    this.showEditModal = true;
  }

  sortData(column: string) {
    const isAsc = this.sort.direction === 'asc';
    this.sort.direction = isAsc ? 'desc' : 'asc';

    this.dataSource.data = [...this.users].sort((a, b) => {
      const valueA = a[column as keyof User] || '';
      const valueB = b[column as keyof User] || '';
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updateUser() {
    if (!this.editingUser.userId) {
      this.toastr.error('Invalid user data', 'Error');
      return;
    }
    this.userService.updateUser(this.editingUser.userId, this.editingUser).subscribe({
      next: () => {
        this.toastr.success('User updated successfully!', 'Success');
        this.showEditModal = false;
        this.loadUsers();
      },
      error: (err) =>
        this.toastr.error(err.error.errors || 'Error updating user', 'Error'),
    });
  }

  deleteUser(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toastr.success('User deleted successfully!', 'Success');
        this.loadUsers();
      },
      error: (err) =>
        this.toastr.error(err.error.message || 'Error deleting user', 'Error'),
    });
  }
}
