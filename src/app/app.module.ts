import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { LoginComponent } from './auth/login/login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth-interceptor.service';
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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookDetailsComponent,
    ConfirmLoanComponent,
    UserLoansComponent,
    AddBookComponent,
    AdminDashboardComponent,
    ManageBookComponent,
    BookComponent,
    DeliveryComponent,
    DeliveryManComponent,
    ManageDeliveryManComponent,
    DeliveriesComponent,
    MyDeliveriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule,
    ReactiveFormsModule,
      
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
