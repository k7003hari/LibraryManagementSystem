import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
path="http://localhost:9090/auth/authenticate"
  constructor(private client:HttpClient) { }

  public authenticate_User(authUser:User):Observable<string>
  {
    console.log("Inside autheticate")
    console.log(authUser)
    return this.client.post(this.path, authUser, { responseType: 'text' });
   
  }
}
export class User{
  username:string
  password:string
  constructor( username: string,  password: string) {
    this.username=username
    this.password=password
  }
}