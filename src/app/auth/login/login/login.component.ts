import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
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
      .subscribe((response) => {
        if (response?.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/']); // Redirect to home/dashboard
        }
      });
  }

}
