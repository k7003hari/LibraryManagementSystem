import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 @Component({
  selector: 'app-member-search',
  imports: [RouterLink,FormsModule,CommonModule,NavbarComponent],
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})export class MemberSearchComponent {
  memberId: number = 0;
  member: any = null;
 
  constructor(private memberService: MemberService) {}
 
  searchMember() {
    if (!this.memberId) {
      alert('Please enter a valid Member ID');
      return;
    }
 
    this.memberService.getMemberById(this.memberId).subscribe({
      next: (data) => {
        this.member = data;
        console.log('Member found:', data);
      },
      error: (error) => {
        alert('Member not found.');
        this.member = null;
        console.error('Error fetching member:', error);
      }
    });
  }
}