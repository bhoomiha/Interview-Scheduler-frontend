import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //  Import CommonModule for template usage
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule], //  Importing CommonModule for built-in directives
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService); //  Inject AuthService for authentication handling
  private router = inject(Router); // Inject Router for navigation
  private cdRef = inject(ChangeDetectorRef);

  isLoggedIn = signal(false); //  Signal to track login status
  userName = signal<string | null>(null); //  Signal to store the logged-in user's name
  greeting = signal<string>(''); // Signal to store the greeting message
userProfile: User | null = null;
  showProfilePopup = signal(false); // Add this signal


  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user && user.accessToken) { 
        //  If user is logged in, update state
        this.isLoggedIn.set(true);
        this.userName.set(this.authService.getUserName()); 
        this.getUserProfile();
      } else {
        //  If no user is found, reset the state
        this.isLoggedIn.set(false);
        this.userName.set(null);
      }
    });
  }

  navigateToLogin() { 
    //  Method to navigate to the login page
    this.router.navigate(['/login']);
  }

  logout() {
    // Logout user and clear login state
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.userName.set(null);
  }

  getGreeting(): string {
    //  Get the current hour to determine greeting message
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return 'Good Morning'; //  Morning greeting
    } else if (hours >= 12 && hours < 16) {
      return 'Good Afternoon'; // Afternoon greeting
    } else {
      return 'Good Evening'; //  Evening greeting
    }
  }

  getUserProfile(): void {
    this.authService.getLoggedInUser().subscribe(
      (user) => {
        this.userProfile = user;
        this.cdRef.detectChanges(); // Optional unless needed to trigger view updates
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  toggleProfilePopup(): void {
  if (!this.showProfilePopup()) {
    this.getUserProfile(); // fetch profile only when opening popup
  }
  this.showProfilePopup.set(!this.showProfilePopup());
}
}
