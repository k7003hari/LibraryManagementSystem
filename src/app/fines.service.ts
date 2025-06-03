import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class FinesService {
private pathCal = 'http://localhost:9090/fines/calculatefine'; // POST /{memberId}
private pathPay = 'http://localhost:9090/fines/pay'; // POST /{memberId}/{fineId}
private pathView = 'http://localhost:9090/fines/allfines'; // GET
 
  constructor(private http: HttpClient) {}
 
  calculateFine(memberId: number): Observable<any> {
return this.http.post(`${this.pathCal}/${memberId}`, {});
  }
 
  payFine(memberId: number, fineId: number): Observable<any> {
return this.http.post(`${this.pathPay}/${memberId}/${fineId}`, {});
  }
 
  getAllFines(): Observable<any[]> {
    return this.http.get<any[]>(this.pathView);
  }
}