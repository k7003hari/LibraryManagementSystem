import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,RouterLink,LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
