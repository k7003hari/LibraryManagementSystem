import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrow-book',
  imports: [NavbarComponent,RouterLink, FormsModule],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent {
  memberId!: number;
  bookId!: number;
  returnDate!: string;
  message: string = '';
  today: string = new Date().toISOString().split('T')[0]; 
 
  constructor(private borrowService: BorrowService, private router:Router) {}
 
  borrow() {
    if (!this.memberId || !this.bookId || !this.returnDate) {
      alert('Please fill all fields.');
      return;
    }
 
    this.borrowService.borrowBook(this.memberId, this.bookId, this.returnDate)
      .subscribe({
        next: (response) => {
          this.message = 'Book borrowed successfully!';
          console.log(response);
          alert(this.message);
          this.clearForm();
        },
        error: (err) => {
          this.message = 'Failed to borrow book. Please try again.';
          console.error(err);
          alert(this.message);
        }
      });
  }
 
  clearForm() {
    this.memberId = 0;
    this.bookId = 0;
    this.returnDate = '';
    this.router.navigate(['/borrow'])
  }
}