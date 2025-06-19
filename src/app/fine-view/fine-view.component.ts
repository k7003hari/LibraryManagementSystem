import { Component, OnInit } from '@angular/core';
import { FinesService } from '../fines.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-fine-view',
  standalone: true,
  imports: [FormsModule, NavbarComponent, RouterLink, CommonModule],
  templateUrl: './fine-view.component.html',
  styleUrl: './fine-view.component.css'
})
export class FineViewComponent implements OnInit {
  fineList: any[] = [];
  message = '';
  userRole: string = '';
  memberId: number | null = null;
  isLoading: boolean = false;
 
  constructor(private fineService: FinesService) {}
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    const storedId = localStorage.getItem('memberId');
    this.memberId = storedId ? +storedId : null;
 
    this.fetchFines();
  }
 
  fetchFines() {
    this.message = '';
    this.fineList = [];
    this.isLoading = true;
 
    if (this.userRole === 'admin') {
      this.fineService.getAllFines().subscribe({
        next: (data) => {
          this.fineList = data;
          if (data.length === 0) this.message = 'No fines available.';
          this.isLoading = false;
        },
        error: (err) => {
          this.message = 'Error fetching fines.';
          this.isLoading = false;
          console.error(err);
        },
      });
    } else if (this.userRole === 'member' && this.memberId !== null) {
      this.fineService.getMemberFines(this.memberId).subscribe({
        next: (data) => {
          this.fineList = data;
          if (data.length === 0) this.message = 'You have no fines.';
          this.isLoading = false;
        },
        error: (err) => {
          this.message = 'Error fetching your fines.';
          this.isLoading = false;
          console.error(err);
        },
      });
    } else {
      this.message = 'Invalid user role or session expired.';
      this.isLoading = false;
    }
  }
}