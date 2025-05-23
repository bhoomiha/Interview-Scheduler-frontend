import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class VerifyOtpComponent implements OnDestroy, OnInit {
  otp = '';
  email: string = localStorage.getItem('otpEmail') || '';
  loading = false;
  errorMessage = '';
  private verifyOtpSub?: Subscription;

  timeLeft = 300; // 5 minutes
  timerDisplay = '05:00';
  private timerInterval!: ReturnType<typeof setInterval>;
  otpExpired = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimerDisplay();
      } else {
        clearInterval(this.timerInterval);
        this.otpExpired = true;
        this.errorMessage = 'OTP has expired. Please request a new one.';
  
        setTimeout(() => {
          this.router.navigate(['/login']);  //  Redirect after 2 seconds
        }, 2000);
      }
    }, 1000);
  }
  

  updateTimerDisplay(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplay = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  verifyOtp(): void {
    if (!this.otp.trim()) {
      this.errorMessage = 'OTP is required!';
      return;
    }

    if (this.otpExpired) {
      this.errorMessage = 'OTP has expired. Please request a new one.';
      this.toastr.error('OTP expired. Redirecting to login...');
      return;
      
    }

    const emailFromSession = sessionStorage.getItem('userEmail');
    if (!emailFromSession) {
      this.toastr.error('Email is missing!');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.verifyOtpSub = this.authService.verifyOtp(emailFromSession, this.otp).subscribe({
      next: (response) => {
        this.toastr.success('OTP Verified Successfully!');
        sessionStorage.setItem('user', JSON.stringify(response));
        
      },
      error: (err) => {
        console.error('OTP error:', err);
        this.errorMessage = err.error?.message || 'Invalid OTP';
        this.otp = '';
        this.loading = false;
        this.verifyOtpSub?.unsubscribe();
      },
      complete: () => {
        this.loading = false;
        this.verifyOtpSub?.unsubscribe();
      },
    });
  }

  getMaskedEmail(email: string): string {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;

    const maskedUsername =
      username.length <= 2
        ? username[0] + '*'.repeat(username.length - 1)
        : username[0] + '*'.repeat(username.length - 2) + username.slice(-1);

    return `${maskedUsername}@${domain}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
    this.verifyOtpSub?.unsubscribe();
  }
}
