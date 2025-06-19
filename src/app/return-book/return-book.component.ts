import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BorrowService } from '../borrow.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-return-book',
  imports: [NavbarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})

export class ReturnBookComponent {
  memberId!: number;
  bookId!: number;
  message: string = '';
  success: boolean = false;

  constructor(private borrowService: BorrowService) { }

  returnBook() {
    if (!this.memberId || !this.bookId) {
      this.message = 'Please fill in all fields.';
      this.success = false;
      return;
    }

    this.borrowService.returnBook(this.memberId, this.bookId)
      .subscribe({
        next: (res) => {
          this.success = true;
          this.message = `✅ Book returned: ${res.bookTitle}. Fine: ₹${res.fineAmount}`;
          console.log('Return response:', res);
          this.clearForm();
        },
        error: (err) => {
          this.success = false;
          this.message = '❌ Failed to return book. Please try again.';
          console.error('Return error:', err);
        }
      });
  }

  clearForm() {
    this.memberId = 0;
    this.bookId = 0;
  }
}
