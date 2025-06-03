import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
isLoggedIn=true

constructor(private router:Router,private authService:AuthService){

  if(authService.getJWT())
 {
this.isLoggedIn=false
 }
}

logout()
 {
  this.authService.removeToken();
  this.isLoggedIn=true
  alert("logged out successfully")
  this.router.navigate(["/home"])
 }

}
