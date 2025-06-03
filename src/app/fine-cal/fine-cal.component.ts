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
  message = '';
  error = '';
 
  constructor(private finesService: FinesService) {}
 
  calculateFine() {
    this.message = '';
    this.error = '';
    this.fineDetails = null;
 
    if (!this.memberId || this.memberId <= 0) {
      this.error = 'Please enter a valid Member ID.';
      return;
    }
 
    this.finesService.calculateFine(this.memberId).subscribe({
      next: (res) => {
        this.fineDetails = res;
        this.message = 'Fine calculated successfully.';
        console.log(res);
      },
      error: (err) => {
        this.error = 'Failed to calculate fine. Please check the Member ID.';
        console.error(err);
      },
    });
  }
}