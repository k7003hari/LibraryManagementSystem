import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 
@Component({
  selector: 'app-razorpay',
  imports: [FormsModule,CommonModule,RouterLink,NavbarComponent],
  templateUrl: './razorpay.component.html',
  styleUrl: './razorpay.component.css'
})
export class RazorpayComponent {
  customerName: string = '';
  email: string = '';
  amount: number | null = null;
 
  constructor(private http: HttpClient) {}
  openRazorpayUI() {
    const options = {
      key: 'rzp_test_mMYCMsqoLV36CI', // use your Razorpay test key here
      amount: 50000, // amount in paise (50000 = ₹500)
      currency: 'INR',
      name: 'Demo Store',
      description: 'Test Transaction',
      handler: (response: any) => {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      theme: {
        color: '#3399cc'
      }
    };
 
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
 
 
}