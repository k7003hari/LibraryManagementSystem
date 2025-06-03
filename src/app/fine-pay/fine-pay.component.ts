import { Component } from '@angular/core';
import { FinesService } from '../fines.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fine-pay',
  imports: [NavbarComponent,RouterLink,FormsModule, CommonModule],
  templateUrl: './fine-pay.component.html',
  styleUrl: './fine-pay.component.css'
})
export class FinePayComponent {
  memberId!: number;
  fineId!: number;
  message: string = '';
 
  constructor(private fineService: FinesService) {}
 
  payFine() {
    this.fineService.payFine(this.memberId, this.fineId).subscribe({
      next: () => {
        this.message = `Fine with ID ${this.fineId} paid successfully by member ${this.memberId}.`;
        console.log(this.message);
      },
      error: (err) => {
        this.message = 'Error paying fine. Please check the Member ID and Fine ID.';
        console.error(err);
      },
    });
  }
}