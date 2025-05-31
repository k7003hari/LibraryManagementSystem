import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { BorrowComponent } from './borrow/borrow.component';
import { MemberComponent } from './member/member.component';
import { FineComponent } from './fine/fine.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { NotificationComponent } from './notification/notification.component';
import { AllBookComponent } from './all-book/all-book.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path:"navbar", component: NavbarComponent},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "book", component: BookComponent},
    { path: "member", component: MemberComponent },
    { path: "borrow", component: BorrowComponent},
    { path: "fine", component: FineComponent},
    { path: "notification", component: NotificationComponent},
    { path: "allBook", component: AllBookComponent},
    { path: "addBook", component: AddBookComponent}
];
