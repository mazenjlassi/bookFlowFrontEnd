import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
  
    this.isLoading = true;
    this.errorMessage = '';
  
    this.authService.login(this.loginForm.value)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (!response) return;
  
          console.log('Backend response:', response);
  
          // Save tokens
          localStorage.setItem('authToken', response.accessToken);
          
  
          // Decode token to get UserId
          const decoded: any = jwtDecode(response.accessToken);
          const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          localStorage.setItem('userId', userId);

          // Get role from token
          const role = this.authService.getCurrentUserRole();
          

  
          // Navigate to home page
          if (role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  
  }


