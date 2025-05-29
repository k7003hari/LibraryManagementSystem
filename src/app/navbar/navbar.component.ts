import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
isLoggedIn=false

constructor(private router:Router,private commonService:CommonService){

}

logout()
 {
  this.isLoggedIn=true
  alert("logged out successfully")
  this.router.navigate(["/login"])
 }

}
