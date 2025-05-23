import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule,MatIconModule,MatButtonModule]
})
export class LoginComponent implements OnDestroy {
  email = '';
  password = '';
  captchaInput = '';
  generatedCaptcha = '';
  loading = false;
  errorMessage = '';
  private loginSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.generateCaptcha(); // Create captcha when component loads
  }

  // Generate random captcha
  generateCaptcha(): void {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing characters like I/O/1/0
    this.generatedCaptcha = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    this.captchaInput = ''; // Reset captcha input
  }

  // Login method
  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    // Check if captcha is correct
    if (this.captchaInput.trim().toUpperCase() !== this.generatedCaptcha.toUpperCase()) {
      this.errorMessage = 'Incorrect captcha. Please try again.';
      this.generateCaptcha(); // Regenerate captcha if incorrect
      return;
    }

    this.loading = true;

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.loginSub = this.authService.login(credentials).subscribe({
      next: (response) => {
        this.toastr.success('Login Successful!');
        if (response.requiresMfa) {
          sessionStorage.setItem('userEmail', this.email);
          localStorage.setItem('otpEmail', this.email);
          this.router.navigate(['/verify-otp']);
        } else {
          this.authService.redirectUser(response.role);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid email or password';
        this.password = '';
        this.loading = false;
        this.generateCaptcha(); // Regenerate captcha on error
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // Clean up subscription on component destroy
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
