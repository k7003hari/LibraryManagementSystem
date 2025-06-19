import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../auth.service';
import {jwtDecode }from 'jwt-decode';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, NavbarComponent, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  toastMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  validate(form: NgForm) {
    if (form.invalid) return;

    this.authService.authenticate_User(form.value).subscribe({
      next: (response: string) => {
        console.log("Login Success:", response);
        localStorage.setItem("JWT", response);

        const decodedToken: any = jwtDecode(response);
        const email = decodedToken.email;
        localStorage.setItem("email", email);
        localStorage.setItem("sub", form.value.username);

        this.toastMessage = "Login Successful! Redirecting...";
        setTimeout(() => {
          this.toastMessage = '';
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: err => {
        console.error("Login Failed", err);
        this.toastMessage = "Login failed! Invalid credentials.";
        setTimeout(() => this.toastMessage = '', 3000);
      }
    });
  }
}