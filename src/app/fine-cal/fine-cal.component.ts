import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FinesService } from '../fines.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fine-cal',
  imports: [NavbarComponent,RouterLink,FormsModule,CommonModule],
  templateUrl: './fine-cal.component.html',
  styleUrl: './fine-cal.component.css'
})
export class FineCalComponent {
  memberId!: number;
  fineDetails: any = null;
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private finesService: FinesService) {}

  calculateFine(): void {
    this.message = '';
    this.error = '';
    this.fineDetails = null;
    this.isLoading = true;

    if (!this.memberId || this.memberId <= 0) {
      this.error = '⚠️ Please enter a valid Member ID.';
      this.isLoading = false;
      return;
    }

    console.log(`Calculating fine for member ID ${this.memberId}`);

    this.finesService.calculateFine(this.memberId).subscribe({
      next: (res) => {
        this.fineDetails = res;
        this.message = '✅ Fine calculated successfully.';
        console.log('Fine Details:', res);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = '❌ Failed to calculate fine. Please check the Member ID.';
        console.error('Calculation Error:', err);
        this.isLoading = false;
      }
    });
  }
}
