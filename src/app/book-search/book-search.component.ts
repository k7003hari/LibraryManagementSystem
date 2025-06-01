import { Component } from '@angular/core';
import { AllBook, BookService } from '../book.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-book-search',
  standalone:true,
  imports: [NavbarComponent, RouterLink,FormsModule,CommonModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  books: AllBook[] = [];
  searchType: string = 'title';
  searchValue: string = '';
 
  constructor(private bookService: BookService) {}
 
  searchBooks(): void {
    if (!this.searchValue.trim()) return;
 
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
}