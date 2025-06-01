import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member',
  imports: [NavbarComponent,RouterLink],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

}
