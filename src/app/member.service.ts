import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = 'http://localhost:9090/members';
  private fineUrl = 'http://localhost:9090/fines';

  constructor(private http: HttpClient) {}

  // 🧾 CRUD: Member operations
  getAllMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallMember`);
  }

  getMemberById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getMemberByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/${email}`);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateMember(id: number, member: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, member);
  }

  addMember(member: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/regMember`, member);
  }

   calculateFine(memberId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:9090/fines/generate/`+memberId, {});
  }

   payFine(memberId: number, fineId: number): Observable<any> {
    return this.http.post<any>(`${this.fineUrl}/pay/${memberId}/${fineId}`, {});
  }
}