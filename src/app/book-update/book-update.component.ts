import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService, AddBook, AllBook } from '../book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  bookId!: string;
  book: AddBook = new AddBook('', '', '', '', '', '');
  toastMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getById(this.bookId).subscribe({
      next: (data: AllBook) => {
        this.book = new AddBook(
          data.title,
          data.author,
          data.genre,
          data.isbn,
          data.yearPublished,
          data.availableCopies
        );
      },
      error: (err) => {
        console.error('Error fetching book:', err);
      }
    });
  }

  updateBook(): void {
    if (!this.bookId) return;
    this.bookService.update(this.bookId, this.book).subscribe({
      next: () => {
        console.log('✅ Book updated:', this.book);
        this.toastMessage = 'Book updated successfully!';
        setTimeout(() => {
          this.toastMessage = null;
          this.router.navigate(['/allBook']);
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Error updating book:', err);
        this.toastMessage = 'Failed to update book!';
        setTimeout(() => (this.toastMessage = null), 3000);
      }
    });
  }
}