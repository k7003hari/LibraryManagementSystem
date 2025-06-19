import { Component, OnInit } from '@angular/core';
import { FinesService } from '../fines.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fine-pay',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './fine-pay.component.html',
  styleUrl: './fine-pay.component.css'
})
export class FinePayComponent implements OnInit {
  memberId!: number;
  fineId!: number;
  message: string = '';
  userRole: string = '';
  fineList: any[] = [];
  isLoading = false;

  constructor(private fineService: FinesService) { }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.userRole = role ? role : '';

    if (this.userRole === 'admin') {
      this.loadAllFines();
    } else {
      const storedMemberId = localStorage.getItem('memberId');
      if (storedMemberId) {
        this.memberId = +storedMemberId;
        this.loadMemberFines(this.memberId);
      }
    }
  }

  payFine() {
    this.message = '';
    this.isLoading = true;
    this.fineService.payFine(this.memberId, this.fineId).subscribe({
      next: () => {
        this.message = `Fine with ID ${this.fineId} paid successfully by member ${this.memberId}.`;
        this.loadAllFines(); // refresh list
        this.isLoading = false;
      },
      error: (err) => {
        this.message = 'Error paying fine. Please check the Member ID and Fine ID.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  loadAllFines() {
    this.isLoading = true;
    this.fineService.getAllFines().subscribe({
      next: (data) => {
        this.fineList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.message = 'Failed to load fines.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadMemberFines(memberId: number) {
    this.isLoading = true;
    this.fineService.getMemberFines(memberId).subscribe({
      next: (data) => {
        this.fineList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.message = 'Failed to load member fines.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}