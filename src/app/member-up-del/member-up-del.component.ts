import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-up-del',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './member-up-del.component.html',
  styleUrls: ['./member-up-del.component.css']
})
export class MemberUpDelComponent implements OnInit {
  members: any[] = [];
  member: any = null;
  memberId: number | null = null;
  memberEmail: string = '';
  userRole: string = '';
  loggedInEmail: string = '';
  totalFines: number = 0; // Initialize total fines

  constructor(
    private memberService: MemberService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.extractRoleAndThenLoadMembers();
    // this.calculateFine()
  }
   
  extractRoleAndThenLoadMembers(): void {
    const token = localStorage.getItem('JWT');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userRole = decoded.role || decoded.roles || '';
        this.loggedInEmail = decoded.email;
   
        localStorage.setItem('email', this.loggedInEmail);
   
        if (this.userRole === 'admin') {
          this.loadMembers(); // Admin loads all members
        } else if (this.userRole === 'member') {
          this.fetchLoggedInMemberId(); // Fetch memberId from email
        }
      } catch (err) {
        console.error('Failed to decode JWT', err);
        this.toastr.error('Invalid JWT token');
      }
    }
  }
   
  // ✅ This method ensures you fetch correct memberId via email
  fetchLoggedInMemberId(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.memberService.getMemberByEmail(email).subscribe({
        next: (data) => {
          this.memberId = data.memberId;
          this.members = [data];
          console.log('✅ Logged-in memberId:', this.memberId);
        },
        error: () => {
          this.toastr.error('Could not fetch your profile');
        }
      });
    }
  }
   

  loadMembers(): void {
    if (this.userRole === 'admin') {
      this.memberService.getAllMembers().subscribe({
        next: (data) => this.members = data,
        error: (err) => {
          console.error('Error loading members', err);
          this.toastr.error('Failed to load members');
        }
      });
    } else if (this.userRole === 'member') {
      const email = localStorage.getItem('email');
      if (email) {
        // Get the member's details using the email from the JWT
        this.memberService.getMemberByEmail(email).subscribe({
          next: (data) => {
            this.members = [data];
            this.memberId = data.memberId; // Ensure you get the memberId here
          },
          error: () => {
            this.toastr.error('Could not fetch your profile');
          }
        });
      }
    }
  }

  updateMember(memberId: number): void {
    this.router.navigate(['/updateMember', memberId]);
  }

  deleteMember(memberId: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(memberId).subscribe({
        next: () => {
          this.members = this.members.filter(m => m.memberId !== memberId);
          this.toastr.success('Member deleted successfully');
        },
        error: () => {
          this.toastr.error('Failed to delete member');
        }
      });
    }
  }

  searchMember(): void {
    if (this.memberId) {
      this.memberService.getMemberById(this.memberId).subscribe({
        next: (data) => this.member = data,
        error: () => {
          this.toastr.warning('Member not found by ID');
          this.member = null;
        }
      });
    } else if (this.memberEmail) {
      this.memberService.getMemberByEmail(this.memberEmail).subscribe({
        next: (data) => this.member = data,
        error: () => {
          this.toastr.warning('Member not found by email');
          this.member = null;
        }
      });
    } else {
      this.toastr.info('Please enter a Member ID or Email to search');
    }
  }

  fineDetails: any = null;
  message: string = '';
  error: string = '';

  calculateFine(): void {
    this.message = '';
    this.error = '';

    // Ensure you are using the memberId that was fetched earlier from getMemberByEmail
    if (!this.memberId) {
      this.error = '⚠️ Member ID not found.';
      return;
    }

    this.memberService.calculateFine(this.memberId).subscribe({
      next: (res) => {
        this.fineDetails = res;
        this.totalFines = this.fineDetails?.amount||0; 
        console.log('✅ Fine details:', this.fineDetails);  
        if (!this.fineDetails || !this.fineDetails.amount|| this.fineDetails.amount === 0) {
          this.message = '🎉 You have no pending fine.';
          this.fineDetails = null; // Reset fine details
          return;
        }

        if (this.fineDetails.status === 'PAID') {
          this.message = '✅ Fine already paid.';
          return;
        }

        this.message = '✅ Fine calculated successfully. Opening payment...';

       
      },
      error: (err) => {
        console.error('❌ Backend error:', err);

        const errMsg = err?.error?.message || '';

        if (
          errMsg.toLowerCase().includes('no fine due') ||
          errMsg.toLowerCase().includes('fine not found') ||
          err.status === 404
        ) {
          this.message = '🎉 You have no pending fine.';
        } else {
          this.error = '❌ Error calculating fine.';
        }
      }
    });
  }

  payFine(): void {
    this.message = '';
    this.error = '';
   
    const fineId = this.fineDetails?.fineId;
   
    if (!fineId || !this.memberId) {
      this.error = '⚠️ Please calculate fine first.';
      return;
    }
   
    this.memberService.payFine(this.memberId, fineId).subscribe({
      next: () => {
        this.message = '💸 Fine paid successfully.';
        
        // ✅ Reset fine status
        this.fineDetails.forEach((fine: any) => fine.status = 'PAID');
        this.totalFines = 0;
   
        // ✅ Optional: Refresh members list (especially for admin view)
        this.loadMembers();
   
        // ✅ Optional: Clear fineDetails after short delay
        setTimeout(() => {
          this.fineDetails = [];
        }, 2000);
      },
      error: (err) => {
        this.error = '❌ Payment failed.';
        console.error(err);
      }
    });
  }

  goToAddMember(): void {
    this.router.navigate(['/addMember']);
  }

  openRazorpayUI(): void {
    const self = this; // capture Angular context

    const options = {
      key: 'rzp_test_mMYCMsqoLV36CI',
      amount: this.totalFines * 100, // convert ₹ to paise
      currency: 'INR',
      name: 'Library Management System',
      description: 'Fine Payment',
      handler: function (response: any) {
        alert('✅ Payment successful!\nPayment ID: ' + response.razorpay_payment_id);

        // ✅ Now correctly call Angular method
        self.payFine();
      },
      prefill: {
        name: self.members[0]?.name || 'Member',
        email: self.members[0]?.email || 'member@example.com'
      },
      theme: {
        color: '#007bff'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    this.router.navigate(['/allBook']);
  }
}