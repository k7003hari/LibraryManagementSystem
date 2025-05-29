import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router:Router){

  }
loginr(){
  this.router.navigate(['/login'])
}
}
