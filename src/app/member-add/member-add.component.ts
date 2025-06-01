import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 
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
 
  constructor(private memberService: MemberService,private route: ActivatedRoute, private router: Router,) {}
 
  addMember() {
    this.memberService.addMember(this.member).subscribe({
      next: (res) => {
        alert('Member added successfully!');
        console.log('Add Member Response:', res);
        this.clearForm();
      },
      error: (err) => {
        alert('Failed to add member!');
        console.error('Add Member Error:', err);
      }
    });
    this.router.navigate(['/member'])
  }
 
  clearForm() {
    this.member = {
      name: '',
      email: '',
      phone: '',
      address: '',
      membershipStatus: ''
    };
  }
}