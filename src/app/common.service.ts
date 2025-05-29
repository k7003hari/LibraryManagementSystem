import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  sayHello() {
    console.log("from commonservice class method")
  }
}
