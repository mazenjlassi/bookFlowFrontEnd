import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { ConfirmLoanComponent } from './confirm-loan/confirm-loan/confirm-loan.component';
import { UserLoansComponent } from './user-loans/user-loans/user-loans.component';
import { AddBookComponent } from './admin/book/add-book/add-book.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { ManageBookComponent } from './admin/book/manage-book/manage-book.component';
import { BookComponent } from './admin/book/book/book.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';
import { DeliveryManComponent } from './admin/delivery-man/delivery-man/delivery-man.component';
import { ManageDeliveryManComponent } from './admin/delivery-man/manage-delivery-man/manage-delivery-man.component';
import { DeliveriesComponent } from './deliveryman/deliveries/deliveries.component';
import { MyDeliveriesComponent } from './deliveryman/my-deliveries/my-deliveries.component';

const routes: Routes = [ 
  { path: 'register', component: RegisterComponent },
  {path: 'home', component:HomeComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'confirm-loan/:bookId', component: ConfirmLoanComponent },
  { path: 'user-loans/:userId', component: UserLoansComponent },
  {path: 'admin/book-add', component:AddBookComponent},
  {path:'admin/dashboard',component:AdminDashboardComponent},
  {path: 'admin/manage-book',component:ManageBookComponent},
  {path: 'admin/book/:id',component:BookComponent},
  {path: 'admin/delivery', component:DeliveryComponent},
  {path: 'admin/delivery-man', component :DeliveryManComponent},
  {path:'admin/manage-delivery-man',component:ManageDeliveryManComponent},
  {path:'deliveryman/deliveries',component:DeliveriesComponent},
  {path:'deliveryman/my-deliveries',component:MyDeliveriesComponent},
  { path: '', component: LoginComponent },
 
  
  
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
