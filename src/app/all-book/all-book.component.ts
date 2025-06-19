import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AllBook, BookService } from '../book.service';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MemberService } from '../member.service';
import { BorrowService } from '../borrow.service';
 
@Component({
  selector: 'app-all-book',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule],
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})
export class AllBookComponent {
  books: AllBook[] = [];
  allBooks: AllBook[] = [];
  searchType: string = 'title';
  searchValue: string = '';
  error: any;
  userRole: string = '';
  toastMessage: string = '';
 
  constructor(
    private bookService: BookService,
    private route: Router,
    private memberService: MemberService,
    private borrowService: BorrowService
  ) {
    this.loadBooks();
    this.extractRole();
  }
 
  extractRole(): void {
    const token = localStorage.getItem('JWT');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userRole = decoded.role || decoded.roles || '';
        localStorage.setItem("userId", decoded.userId);
      } catch (err) {
        console.error('Failed to decode JWT', err);
      }
    }
  }
 
  extractEmail(): string | null {
    const token = localStorage.getItem('JWT');
    if (!token) return null;
 
    try {
      const decoded: any = jwtDecode(token);
return decoded.email || decoded.sub || null;
    } catch {
      return null;
    }
  }
 
  loadBooks(): void {
    this.bookService.view().subscribe({
      next: (response: AllBook[]) => {
        this.books = response.map(book => ({ ...book, borrowedByMe: false, returnDate: '' }));
        this.allBooks = this.books;
   
        const email = this.extractEmail();
        if (!email) {
          return;
        }
   
        this.memberService.getMemberByEmail(email).subscribe({
          next: (member) => {
            if (!member || !member.memberId) {
              return;
            }
   
            this.borrowService.getBorrowedBooksByMember(member.memberId).subscribe({
              next: (borrowedBooks) => {
                borrowedBooks.forEach((borrowed: any) => {
                  const borrowedBook = this.books.find(b => b.bookId === borrowed.bookId);
                  console.log(`Processing borrowed book: ${borrowed.bookId} for member: ${member.memberId}`);
                  if (borrowedBook) {
                    borrowedBook.borrowedByMe = true ;
                    borrowedBook.returnDate = borrowed.returnDate; // or format if needed
                  }
                });
              },
              error: err => {
                console.error('Failed to get borrowed books', err);
              }
            });
          },
          error: err => {
            console.error('Failed to fetch member', err);
          }
        });
      },
      error: err => this.error = err.message
    });
  }
   
 
  searchBooks(): void {
    if (!this.searchValue.trim()) {
      this.books = this.allBooks;
      return;
    }
 
    switch (this.searchType) {
      case 'title':
        this.bookService.searchByTitle(this.searchValue).subscribe(data => this.books = data);
        break;
      case 'author':
        this.bookService.searchByAuthor(this.searchValue).subscribe(data => this.books = data);
        break;
      case 'genre':
        this.bookService.searchByGenre(this.searchValue).subscribe(data => this.books = data);
        break;
    }
  }
 
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(bookId).subscribe(() => {
        this.books = this.books.filter(book => book.bookId !== bookId);
      });
    }
  }
 
  updateBook(bookId: string): void {
    console.log("clicked");
    this.route.navigate(['/updatebook', bookId]);
  }
 
  borrowBook(bookId: string): void {
    const email = this.extractEmail();
    if (!email) {
      this.toastMessage = 'User email not found in token, please login again.';
      return;
    }
 
    this.memberService.getMemberByEmail(email).subscribe({
      next: (member) => {
        if (!member || !member.memberId) {
          this.toastMessage = 'Member data not found';
          return;
        }
 
        const today = new Date();
        const returnDate = new Date(today);
        returnDate.setDate(today.getDate() + 14);
        const returnDateStr = returnDate.toISOString().slice(0, 10);
 
        this.borrowService.borrowBook(member.memberId, +bookId, returnDateStr).subscribe({
          next: () => {
            const borrowedBook = this.books.find(b => b.bookId === bookId);
            if (borrowedBook) {
              borrowedBook.borrowedByMe = true;
              borrowedBook.returnDate = returnDateStr;
            }
            this.toastMessage = `Book borrowed successfully! Return by ${returnDateStr}`;
          },
          error: err => {
            console.error(err);
            this.toastMessage = 'Error borrowing book: ' + (err.error || err.message);
          }
        });
      },
      error: err => {
        console.error('Error fetching member:', err);
        this.toastMessage = 'Failed to get member details.';
      }
    });
  }
 
  returnBook(bookId: string): void {
    const email = this.extractEmail();
    if (!email) {
      this.toastMessage = 'User email not found in token, please login again.';
      return;
    }
 
    this.memberService.getMemberByEmail(email).subscribe({
      next: (member) => {
        if (!member || !member.memberId) {
          this.toastMessage = 'Member data not found';
          return;
        }
        
        this.borrowService.returnBook(member.memberId, +bookId).subscribe({
          next: () => {
            const returnedBook = this.books.find(b => b.bookId === bookId);
            if (returnedBook) {
              returnedBook.borrowedByMe = false;
              returnedBook.returnDate = '';
            }
            this.toastMessage = 'Book returned successfully!';
            this.route.navigate(['/memberUpDel']);
          },
          error: err => {
            console.error(err);
            this.toastMessage = 'Error returning book: ' + (err.error || err.message);
          }
        });
      },
      error: err => {
        console.error('Error fetching member:', err);
        this.toastMessage = 'Failed to get member details.';
      }
    });
  }
}