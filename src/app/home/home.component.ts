import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,RouterLink,LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn=false

  constructor(private router:Router,private authService:AuthService){
  
    if(authService.getJWT())
   {
  this.isLoggedIn=true
   }
  }
}
