import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fine',
  imports: [NavbarComponent,RouterLink],
  templateUrl: './fine.component.html',
  styleUrl: './fine.component.css'
})
export class FineComponent {

}
