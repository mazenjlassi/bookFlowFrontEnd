import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}
  navLinks = ['Home', 'Browse', 'Categories', 'About', 'Contact'];

  logout() {
    this.authService.logout();

  }


}
