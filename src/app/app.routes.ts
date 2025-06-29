import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { NotificationComponent } from './notification/notification.component';
import { AllBookComponent } from './all-book/all-book.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookUpDelComponent } from './book-up-del/book-up-del.component';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { MemberUpDelComponent } from './member-up-del/member-up-del.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';                                                                            
import { FineCalComponent } from './fine-cal/fine-cal.component';
import { FinePayComponent } from './fine-pay/fine-pay.component';
import { FineViewComponent } from './fine-view/fine-view.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { authguardGuard } from './authguard.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path:"navbar", component: NavbarComponent},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "notification", component: NotificationComponent},
 
    // book routes
    { path: "allBook", component: AllBookComponent},
    { path: "addBook", component: AddBookComponent},
    {
      path: 'updatebook/:id',
      loadComponent: () => import('./book-update/book-update.component').then(m => m.BookUpdateComponent)
    },

    //member routes
    { path: "addMember", component: MemberAddComponent},
    { path: "memberUpDel", component: MemberUpDelComponent},
    { path: "memberSearch", component: MemberSearchComponent},
    {
      path: 'updateMember/:id',
      loadComponent: () => import('./member-update/member-update.component').then(m => m.MemberUpdateComponent)
    },
   
    //borrow
    { path: "borrowBook", component: BorrowBookComponent},
    { path: "returnBook", component: ReturnBookComponent},
    { path: "allBorrows", component: BorrowBookComponent },

    //fines

    { path: "fineCal", component: FineCalComponent},
    { path: "finePay", component: FinePayComponent},
    { path: "fineView", component: FineViewComponent },

    //notify
    { path: "razor", component: RazorpayComponent }
    
];
