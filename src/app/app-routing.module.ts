import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { ConfirmLoanComponent } from './confirm-loan/confirm-loan/confirm-loan.component';

const routes: Routes = [ 
  { path: 'register', component: RegisterComponent },
  {path: 'home', component:HomeComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'confirm-loan/:bookId', component: ConfirmLoanComponent },
  { path: '', component: LoginComponent },
 
  
  
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
