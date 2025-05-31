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
    var username:string=form.value.username 
    var password:string=form.value.password
    console.log(username)

    const user = new User(username,password)
    this.authService.authenticate_User(user).subscribe(response => {
      console.log("Response from backend:", response);
      localStorage.setItem("JWT",response)
      alert("Logged In Successfully")
      this.router.navigate(['/home'])
    });
  }
}
