import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

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
    const decoded = jwtDecode<JwtPayload>(localStorage.getItem('JWT'));
    const role: string = decoded.roles ?? 'No role found';
    const id :any = decoded.userId ?? 'No id found';
    sessionStorage.setItem('userId',id.toString());
    sessionStorage.setItem('roles',role)
    console.log(role);
    console.log(id);
      alert("Logged In Successfully")
      this.router.navigate(['/home'])
    });
  }
}
interface JwtPayload {
  roles?: string;  
  userId ?:any;
}

