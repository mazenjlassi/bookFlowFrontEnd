import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 

  user = {
    username: '',
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService ,private router: Router) {}


  
  onRegister() {
    this.authService.register(this.user).subscribe({
      next: res => {
        console.log('User registered successfully', res);
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Registration failed', err);
      }
    });
  }


}
