import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ChangePasswordComponent implements OnDestroy {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage: string | null = null;
  loading = false;

  private changePasswordSub?: Subscription;
 

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  changePassword(): void {
    this.errorMessage = null;

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match!';
      return;
    }

    const email = localStorage.getItem('otpEmail');
    if (!email) {
      this.errorMessage = 'Email is missing!';
      return;
    }

    this.loading = true;

    this.changePasswordSub = this.authService.changePassword(email, this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.toastr.success('OTP Verified Successfully!');
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to change password';
        this.loading = false;
        this.changePasswordSub?.unsubscribe();
      },
      complete: () => {
        this.loading = false;
        this.changePasswordSub?.unsubscribe();
      },
    });
  }

  ngOnDestroy(): void {
    this.changePasswordSub?.unsubscribe();
  }
}
