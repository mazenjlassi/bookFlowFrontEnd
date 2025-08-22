import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navLinks: { label: string, path: string }[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.navLinks = [
      { label: 'Home', path: '/home' },
      { label: 'My Loans', path: `/user-loans/${this.authService.getUserId()}` },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' }
    ];
  }

  logout() {
    this.authService.logout();
  }


}
