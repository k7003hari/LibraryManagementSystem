import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BorrowService } from '../borrow.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-return-book',
  imports: [NavbarComponent, RouterLink,FormsModule,CommonModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {
  memberId!: number;
  bookId!: number;
  message: string = '';
 
  constructor(private borrowService: BorrowService) {}
 
  returnBook() {
    if (!this.memberId || !this.bookId) {
      alert('Please fill all fields.');
      return;
    }
 
    this.borrowService.returnBook(this.memberId, this.bookId)
      .subscribe({
        next: (res) => {
          this.message = 'Book returned successfully!';
          console.log(res);
          alert(this.message);
          this.clearForm();
        },
        error: (err) => {
          this.message = 'Failed to return book.';
          console.error(err);
          alert(this.message);
        }
      });
  }
 
  clearForm() {
    this.memberId = 0;
    this.bookId = 0;
  }
}
