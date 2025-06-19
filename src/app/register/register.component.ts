import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterLink,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  toastMessage: string = '';
  isError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  validateR(form: NgForm) {
    if (form.invalid) return;

    this.authService.register(form.value).subscribe({
      next: (response) => {
        this.isError = false;
        this.toastMessage = '✅ Registration successful! Redirecting to login...';
        console.log("Registration success:", response);

        setTimeout(() => {
          this.toastMessage = '';
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        this.isError = true;
        this.toastMessage = '❌ Registration failed. Please try again.';
        console.error("Registration error:", err);

        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
      }
    });
  }
}