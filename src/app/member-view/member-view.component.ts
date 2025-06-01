import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 
@Component({
  selector: 'app-member-view',
  imports: [RouterLink,FormsModule,CommonModule,NavbarComponent],
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  members: any[] = [];
 
  constructor(private memberService: MemberService) {}
 
  ngOnInit(): void {
    this.fetchMembers();
  }
 
  fetchMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.members = data;
        console.log('Fetched members:', data);
      },
      error: (error) => {
        alert('Failed to load members.');
        console.error('Error fetching members:', error);
      }
    });
  }
}