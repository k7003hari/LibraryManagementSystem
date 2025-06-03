import { Component, OnInit } from '@angular/core';
import { FinesService } from '../fines.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fine-view',
  imports: [FormsModule,NavbarComponent,RouterLink],
  templateUrl: './fine-view.component.html',
  styleUrl: './fine-view.component.css'
})
export class FineViewComponent implements OnInit {
  fineList: any[] = [];
  message = '';
 
  constructor(private fineService: FinesService) {}
 
  ngOnInit(): void {
    this.fetchAllFines();
  }
 
  fetchAllFines() {
    this.fineService.getAllFines().subscribe({
      next: (data) => {
        this.fineList = data;
        if (data.length === 0) this.message = 'No fines available.';
      },
      error: (err) => {
        this.message = 'Error fetching fines.';
        console.error(err);
      },
    });
  }
}