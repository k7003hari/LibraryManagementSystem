import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private addUrl = 'http://localhost:9090/members/regMember';
  private viewUrl = 'http://localhost:9090/members/getallMember';
  private searchUrl = 'http://localhost:9090/members/';
  private updateUrl = 'http://localhost:9090/members/update/';
  private deleteUrl = 'http://localhost:9090/members/delete/';
 
  constructor(private http: HttpClient) {}
 
  addMember(member: any): Observable<any> {
    return this.http.post(this.addUrl, member);
  }
 
  getAllMembers(): Observable<any> {
    return this.http.get(this.viewUrl);
  }
 
  getMemberById(id: number): Observable<any> {
    return this.http.get(this.searchUrl + id);
  }
 
  updateMember(id: number, member: any): Observable<any> {
    return this.http.put(this.updateUrl + id, member);
  }
 
  deleteMember(id: number): Observable<any> {
    return this.http.delete(this.deleteUrl + id);
  }
}
 