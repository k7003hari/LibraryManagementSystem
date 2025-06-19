import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-update',
  imports: [RouterLink,FormsModule,NavbarComponent],
  templateUrl: './member-update.component.html',
  styleUrl: './member-update.component.css'
})
export class MemberUpdateComponent implements OnInit {
  memberId!: number;
  member = {
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipStatus: ''
  };
  toastMessage: string;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {}
 
  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMemberById(this.memberId).subscribe(data => {
      this.member = data;
    });
  }
 
  updateMember(): void {
    this.memberService.updateMember(this.memberId, this.member).subscribe(() => {
      this.toastMessage = 'Book updated successfully!';
      setTimeout(() => (this.toastMessage = null), 3000);
      this.router.navigate(['/memberUpDel']);
    });
  }
}