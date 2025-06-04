import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AllBook, BookService } from '../book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [NavbarComponent, RouterLink,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  
}

// import { Component, inject, NgModule, OnInit } from '@angular/core';
// import { AllBook, BookService } from '../book.service';
// import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { CommonModule } from '@angular/common';
 


// @Component({
//   selector: 'app-book',
//   standalone:true,
//   imports: [NavbarComponent, RouterLink,FormsModule,CommonModule],
//   providers:[{provide: JWT_OPTIONS,useValue: JWT_OPTIONS},JwtHelperService],
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent implements OnInit {

//   jwtHelper=inject(JwtHelperService);

//   books: AllBook[] = [];
//   searchTitle = '';
//   searchAuthor = '';
//   searchGenre = '';
//   role: string = '';
//   memberId: number = 0;
 
//   constructor(private bookService: BookService) {}
 
//   ngOnInit(): void {
//     this.role = this.getRoleFromJWT();
//     this.memberId = this.getMemberId();
//     this.getAllBooks();
//   }
 
//   getRoleFromJWT(): string {
//     const token = localStorage.getItem('token');
//     if (!token) return '';
//     const decoded = this.jwtHelper.decodeToken(token);
//     return decoded.roles || '';
//   }
 
//   getMemberId(): number {
//     const id = localStorage.getItem('memberId');
//     return id ? +id : 0;
//   }
 
//   getAllBooks(): void {
//     this.bookService.getAllBooks().subscribe(data => {
//       this.books = data;
//     });
//   }
 
//   search(): void {
//     if (this.searchTitle) {
//       this.bookService.searchByTitle(this.searchTitle).subscribe(data => this.books = data);
//     } else if (this.searchAuthor) {
//       this.bookService.searchByAuthor(this.searchAuthor).subscribe(data => this.books = data);
//     } else if (this.searchGenre) {
//       this.bookService.searchByGenre(this.searchGenre).subscribe(data => this.books = data);
//     } else {
//       this.getAllBooks();
//     }
//   }
 
//   borrowBook(bookId: number): void {
//     const payload = { memberId: this.memberId, bookId, returnDate: '2025-06-10' };
//     this.bookService.borrowBook(payload).subscribe(() => {
//       alert("Book borrowed!");
//       this.getAllBooks();
//     });
//   }
 
//   returnBook(bookId: number): void {
//     const payload = { memberId: this.memberId, bookId };
//     this.bookService.returnBook(payload).subscribe(() => {
//       alert("Book returned!");
//       this.getAllBooks();
//     });
//   }
 
//   deleteBook(id: number): void {
//     this.bookService.deleteBook(id).subscribe(() => {
//       alert("Book deleted.");
//       this.getAllBooks();
//     });
//   }
 
//   updateBook(id: number): void {
//     window.location.href = `/updateBook/${id}`;
//   }
 
//   goToAddBook(): void {
//     window.location.href = `/addBook`;
//   }
 
//   goToBorrowed(): void {
//     window.location.href = `/viewBorrowed`;
//   }
// }