import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  pathL = "http://localhost:9090/auth/authenticate"  
  pathR = "http://localhost:9090/auth/new"

  constructor(private client: HttpClient) { }

  public authenticate_User(authUser: User): Observable<string> {
    console.log("Inside autheticate")
    console.log(authUser)
    return this.client.post(this.pathL, authUser, { responseType: 'text' });
  }

 public register(user:RegisterUser): Observable<string> {
    return this.client.post(this.pathR,user,{responseType: 'text'})
  }

  getJWT():string
  {
    
    return localStorage.getItem("JWT")
  }
  removeToken()
  {
    localStorage.removeItem("JWT")
    localStorage.removeItem("sub")
    localStorage.removeItem("memberId")
    localStorage.removeItem("email")
}
}

export class User {
  username: string
  password: string
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export class RegisterUser{
  name:string
  email:string
  password:string
  roles:string
  constructor(username: string,email:string,  password: string,roles:string)
  {
    this.name=username
    this.email=email
    this.password=password
    this.roles=roles
  }
}