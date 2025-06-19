import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { FormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrow-book',
  imports: [NavbarComponent,RouterLink, FormsModule,CommonModule],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent {
  memberId!: number;
  bookId!: number;
  returnDate!: string;
  message = '';
  success = false;
  today: string = new Date().toISOString().split('T')[0];
 
  constructor(private borrowService: BorrowService, private router: Router) {}
 
  borrow() {
    if (!this.memberId || !this.bookId || !this.returnDate) {
      this.message = 'Please fill in all fields.';
      this.success = false;
      return;
    }
 
    this.borrowService.borrowBook(this.memberId, this.bookId, this.returnDate)
      .subscribe({
        next: (res) => {
          this.message = `✅ Book borrowed successfully! Return by: ${res.dueDate}, Title: ${res.bookTitle}`;
          this.success = true;
          console.log('Borrow response:', res);
          this.clearForm();
        },
        error: (err) => {
          this.message = '❌ Failed to borrow book. Please try again.';
          this.success = false;
          console.error('Borrow error:', err);
        }
      });
  }
 
  clearForm() {
    this.memberId = 0;
    this.bookId = 0;
    this.returnDate = '';
  }
}