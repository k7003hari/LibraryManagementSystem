import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  private pathBorrow = 'http://localhost:9090/borrowings/borrow'; // ("memberId": 3, "bookId": 2, "returnDate":"2025-06-03")
  private pathReturn = 'http://localhost:9090/borrowings/return'; // ("memberId": 1, "bookId": 2)
  private pathAllBorrows = 'http://localhost:9090/borrowings/'; // http://localhost:9090/borrowings/1 pass the member. Id

  constructor(private clients: HttpClient) { }

  borrowBook(memberId: number, bookId: number, returnDate: string): Observable<any> {
    const payload = { memberId, bookId, returnDate };
    return this.clients.post(this.pathBorrow, payload);
  }

  returnBook(memberId: number, bookId: number): Observable<any> {
    console.log(`Returning book with ID ${bookId} for member with ID ${memberId}`);
    const payload = { memberId, bookId };
    return this.clients.post(this.pathReturn, payload);
  }

  viewBorrowsByMember(memberId: number): Observable<any> {
    return this.clients.get(this.pathAllBorrows + memberId);
  }

  getBorrowedBooksByMember(memberId: number): Observable<any>{
    return this.clients.get(`http://localhost:9090/borrowings/member/${memberId}`);
    }

}