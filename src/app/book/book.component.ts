import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

}
