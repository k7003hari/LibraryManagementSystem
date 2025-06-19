import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'addbook',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  toastMessage: string | null = null;

  constructor(private router: Router, private bookService: BookService) {}

  validateAdd(form: NgForm) {
    if (form.invalid) return;

    this.bookService.add(form.value).subscribe({
      next: (response) => {
        console.log('✅ Book added:', response);
        this.toastMessage = 'Book added successfully!';
        setTimeout(() => {
          this.toastMessage = null;
          this.router.navigate(['/allBook']);
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error adding book:', error);
        this.toastMessage = 'Failed to add book!';
        setTimeout(() => (this.toastMessage = null), 3000);
      }
    });
  }
}