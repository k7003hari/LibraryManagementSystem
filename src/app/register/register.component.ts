import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router:Router, private authService:AuthService){}

validateR(form:NgForm) 
{
  console.log('User Registeration')
  this.authService.register(form.value).subscribe(response=>console.log(response))
  this.router.navigate(['/login'])
}
}
