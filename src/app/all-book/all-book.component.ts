import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AddBook, BookService } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-book',
  imports: [NavbarComponent,RouterLink, CommonModule],
  templateUrl: './all-book.component.html',
  styleUrl: './all-book.component.css'
})
export class AllBookComponent {
  error: any;
  book:AllBookComponent[];

  constructor(private bookService:BookService){
    this.view()
  }
      view(){
   
     this.bookService.view().subscribe(response => this.handleSuccessfulResponse(response),
     error => { this.error = error.message }
   );
  }
  handleSuccessfulResponse(response) {
    console.log(response)
    this.book = response;
  }


}
