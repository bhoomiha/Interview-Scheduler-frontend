import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthCredentials, ChangePasswordResponse, LoginResponse, RefreshTokenResponse, RevokeTokenResponse, VerifyOtpResponse } from '../../shared/models/auth-credentials';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + environment.loginUrl;
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;


  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
  }

  private safeSessionGet(key: string): string | null {
    return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
  }

  private safeSessionSet(key: string, value: string): void {
    if (typeof window !== 'undefined') sessionStorage.setItem(key, value);
  }

  private safeSessionClear(): void {
    if (typeof window !== 'undefined') sessionStorage.clear();
  }

  private safeLocalRemove(key: string): void {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }

  private loadUser() {
    const user = JSON.parse(this.safeSessionGet('user') || 'null');
    if (user?.accessToken) {
      this.currentUserSubject.next(user);
      this.startRefreshTimer();
    }
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser()?.accessToken;
  }

  getUserRole(): string {
    try {
      const token = this.getCurrentUser()?.accessToken;
      const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
      return payload?.role || '';
    } catch {
      return '';
    }
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }
  // AuthService method to get currently logged-in user details
getLoggedInUser(): Observable<User> {
  const url = `${environment.apiUrl}/Admin/Me`;  // Adjust URL if needed
  return this.http.get<User>(url).pipe(
    catchError(this.handleError)
  );
}


  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((user) => {
        this.safeSessionSet('user', JSON.stringify(user));
        this.safeSessionSet('otpEmail', credentials.email);
        this.currentUserSubject.next(user);
        this.startRefreshTimer();

        if (user.requiresMfa) {
          this.router.navigate(['/verify-otp']);
        } else {
          this.redirectUser(user.role);
        }
      }),
      catchError(this.handleError)
    );
  }

  verifyOtp(email: string, otpCode: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.apiUrl}/verify-otp`, { email, otpCode }).pipe(
      tap(response => {
        console.log('OTP Verification Response:', response);
 
        if (response.requiresPasswordChange) {
          this.router.navigate(['/changepassword'], { queryParams: { email } });
          return;
        }
 
        if (response.accessToken) {
          sessionStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
          this.startRefreshTimer();
 
          const userRole = this.getUserRole();
          console.log('Extracted Role:', userRole);
 
          this.redirectUser(userRole);
        }
      }),
      catchError(this.handleError)
    );
  }
  

  refreshToken(): Observable<RefreshTokenResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh-token`, {
      refreshToken: currentUser.refreshToken,
    }).pipe(
      tap((tokenResponse) => {
        const updatedUser: LoginResponse = {
          ...currentUser,
          ...tokenResponse,
        };
        this.safeSessionSet('user', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
        this.startRefreshTimer();
      }),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  revokeToken(): Observable<RevokeTokenResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RevokeTokenResponse>(`${this.apiUrl}/revoke-token`, {
      refreshToken: currentUser.refreshToken,
    }).pipe(
      tap(() => {
        this.performLogoutCleanup();
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser?.refreshToken) {
      this.http.post<RevokeTokenResponse>(`${this.apiUrl}/revoke-token`, {
        refreshToken: currentUser.refreshToken,
      }).subscribe({
        next: () => this.performLogoutCleanup(),
        error: () => this.performLogoutCleanup(),
      });
    } else {
      this.performLogoutCleanup();
    }
  }

  private performLogoutCleanup(): void {
    this.safeSessionClear();
    this.safeLocalRemove('otpEmail');
    this.currentUserSubject.next(null);
    this.clearRefreshTimer();
    this.router.navigate(['/login']);
  }

  private startRefreshTimer(): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.accessToken) return;

    try {
      const payload = JSON.parse(atob(currentUser.accessToken.split('.')[1]));
      const expires = payload.exp * 1000;
      const timeout = expires - Date.now() - 60000;

      if (timeout > 0) {
        this.clearRefreshTimer();
        this.refreshTimer = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeout);
      } else {
        this.refreshToken().subscribe();
      }
    } catch {
      this.logout();
    }
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  getUserName(): string | null {
    try {
      const token = this.getCurrentUser()?.accessToken;
      const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
      return payload?.unique_name || null;
    } catch {
      return null;
    }
  }

  redirectUser(role: string | null) {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admindashboard']);
        break;
      case 'PanelMember':
        this.router.navigate(['/panel-member']);
        break;
      case 'PanelCoordinator':
        this.router.navigate(['/panel-coordinator']);
        break;
      case 'ReportingManager':
        this.router.navigate(['/reporting-manager']);
        break;
      case 'TARecruiter':
        this.router.navigate(['/ta-recruiter']);
        break;
      case 'TAAdmin':
        this.router.navigate(['/tadmin']);
        break;
      case 'Candidate':
        this.router.navigate(['/candidate']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(`${this.apiUrl}/change-password`, { email, currentPassword, newPassword }).pipe(
      tap(response => {
        console.log('Change Password Response:', response);
 
        if (response.accessToken) {
          const updatedUser = { ...response, isFirstLogin: false };
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
          this.startRefreshTimer();
 
          const userRole = this.getUserRole();
          console.log('Extracted Role:', userRole);
          this.redirectUser(userRole);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.error?.message || 'Something went wrong'));
  }
}
