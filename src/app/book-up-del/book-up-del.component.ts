import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AllBook, BookService } from '../book.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-book-up-del',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './book-up-del.component.html',
  styleUrls: ['./book-up-del.component.css']
})
export class BookUpDelComponent {
  books: AllBook[] = [];
 
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this.getAllBooks();
  }
 
  getAllBooks(): void {
    this.bookService.view().subscribe((data) => {
      this.books = data;
    });
  }
 
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(bookId).subscribe(() => {
        this.books = this.books.filter(book => book.bookId !== bookId);
      });
    }
  }
 
  updateBook(bookId: string): void {
    console.log("clicked")
    this.router.navigate(['/updatebook', bookId]);
  }

  trackById(index: number, book: AllBook) {
    return book.bookId;
  }
}