import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AllBook, BookService } from '../book.service';

@Component({
  selector: 'app-book',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books: AllBook[] = [];
    error: any;
   
    constructor(private bookService: BookService) {
      this.view();
    }
   
    
    view() {
      this.bookService.view().subscribe({
        next: (response: AllBook[]) => this.books = response,
        error: err => this.error = err.message
      });
    }
  }

