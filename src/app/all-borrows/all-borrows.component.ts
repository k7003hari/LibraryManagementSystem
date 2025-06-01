import { Component } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-borrows',
  imports: [NavbarComponent,FormsModule,CommonModule,RouterLink],
  templateUrl: './all-borrows.component.html',
  styleUrl: './all-borrows.component.css'
})

export class ViewBorrowsComponent {
  memberId!: number;
  borrowList: any[] = [];
  message: string = '';
 
  constructor(private borrowService: BorrowService) {}
 
  fetchBorrows() {
    if (!this.memberId) {
      alert('Please enter Member ID');
      return;
    }
 
    this.borrowService.viewBorrowsByMember(this.memberId).subscribe({
      next: (res) => {
        this.borrowList = res;
        this.message = this.borrowList.length > 0 ? '' : 'No borrow records found.';
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Failed to fetch borrow records.';
      }
    });
  }
}
