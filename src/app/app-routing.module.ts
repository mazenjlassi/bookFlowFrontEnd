import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { ConfirmLoanComponent } from './confirm-loan/confirm-loan/confirm-loan.component';
import { UserLoansComponent } from './user-loans/user-loans/user-loans.component';
import { AddBookComponent } from './admin/book/add-book/add-book.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { ManageBookComponent } from './admin/manage-book/manage-book/manage-book.component';

const routes: Routes = [ 
  { path: 'register', component: RegisterComponent },
  {path: 'home', component:HomeComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'confirm-loan/:bookId', component: ConfirmLoanComponent },
  { path: 'user-loans/:userId', component: UserLoansComponent },
  {path: 'admin/book-add', component:AddBookComponent},
  {path:'admin/dashboard',component:AdminDashboardComponent},
  {path: 'admin/manage-book',component:ManageBookComponent},
  { path: '', component: LoginComponent },
 
  
  
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
