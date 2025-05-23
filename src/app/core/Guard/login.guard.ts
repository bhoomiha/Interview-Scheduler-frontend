import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.authService.logout(); //  Logout user if already logged in
      return false; // Prevent navigation to login page
    }
    return true; // Allow access to login page for non-authenticated users
  }
}
