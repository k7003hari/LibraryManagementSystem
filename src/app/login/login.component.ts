import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,NavbarComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private authService:AuthService, private router:Router){

}
validate(form:NgForm)
  {
    
    console.log(form.value)    
    this.authService.authenticate_User(form.value).subscribe(response => {
      console.log("Response from backend:", response);
      localStorage.setItem("JWT",response)
      alert("Logged In Successfully")
      this.router.navigate(['/home'])
    });
  }
}
