import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AllBook, BookService, } from '../book.service';
 
@Component({
  selector: 'app-all-book',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})
export class AllBookComponent {
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
 