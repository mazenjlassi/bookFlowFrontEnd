import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';

const routes: Routes = [ 
  { path: 'register', component: RegisterComponent },
  {path: 'home', component:HomeComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: '', component: LoginComponent },
 
  
  
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
