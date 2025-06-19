import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userRole: string = '';
  toastMessage: string = '';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.extractRole();
  }

  checkLoginStatus(): void {
    const token = this.authService.getJWT();
    this.isLoggedIn = !!token;
  }

  extractRole(): void {
    const token = localStorage.getItem('JWT');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userRole = decoded.role || decoded.roles || '';
        localStorage.setItem('userId', decoded.userId);
      } catch (err) {
        console.error('Failed to decode JWT', err);
      }
    }
  }

  logout(): void {
    this.authService.removeToken();
    this.isLoggedIn = false;
    this.toastMessage = 'Logged out successfully!';
    this.router.navigate(['/home']);

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}