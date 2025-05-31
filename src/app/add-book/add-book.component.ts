import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'addbook',
  imports: [NavbarComponent,RouterLink,FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  constructor(private router:Router, private bookService:BookService){}

  validateAdd(form:NgForm){
    this.bookService.add(form.value).subscribe(response=>console.log(response))
    alert("Book Added Successfully")
    this.router.navigate(["/book"])

  }

}
