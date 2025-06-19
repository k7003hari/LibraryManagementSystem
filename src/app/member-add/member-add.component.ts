import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-member-add',  
  imports: [RouterLink,FormsModule,CommonModule,NavbarComponent],
  templateUrl: './member-add.component.html',  
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent {
  member = {
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipStatus: ''
  };
 
  toastMessage: string = '';
 
  constructor(private http: HttpClient) {}
 
  addMember() {
    const url = 'http://localhost:9090/members/regMember';
    this.http.post(url, this.member).subscribe({
      next: (response) => {
        console.log('✅ Member added:', response);
        this.toastMessage = '✅ Member registered successfully!';
        setTimeout(() => this.toastMessage = '', 3000);
        this.member = {
          name: '',
          email: '',
          phone: '',
          address: '',
          membershipStatus: ''
        };
      },
      error: (error) => {
        console.error('❌ Error adding member:', error);
        this.toastMessage = '❌ Failed to register member. Please try again.';
        setTimeout(() => this.toastMessage = '', 3000);
      }
    });
  }
}
 