import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole: string = this.authService.getUserRole() || '';
    const requiredRoles: string[] = route.data?.['roles'] || [];

    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']); // Redirect unauthorized users
      return false;
    }

    return true; // Allow navigation
  }
}
