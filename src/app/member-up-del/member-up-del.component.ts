import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 
@Component({
  selector: 'app-member-up-del',
  standalone:true,
  imports: [RouterLink,FormsModule,CommonModule,NavbarComponent],
  templateUrl: './member-up-del.component.html',
  styleUrls: ['./member-up-del.component.css']
})
export class MemberUpDelComponent implements OnInit {
  members: any[] = [];
 
  constructor(private memberService: MemberService, private router: Router) {}
 
  ngOnInit(): void {
    this.loadMembers();
  }
 
  loadMembers(): void {
    this.memberService.getAllMembers().subscribe(data => {
      this.members = data;
    });
  }
 
  updateMember(memberId: number): void {
    this.router.navigate(['/updateMember', memberId]);
  }
 
  deleteMember(memberId: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(memberId).subscribe(() => {
        alert("Deleted successfully");
        this.loadMembers();
      });
    }
  }
}