import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navLinks: NavLink[] = []; 

  isAdmin: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getCurrentUserRole();

    if (role === 'ADMIN') {
      this.isAdmin = true;
      this.navLinks = [
        { label: 'Admin Dashboard', path: '/admin/dashboard' },
        { label: 'Manage Books', path: '/admin/manage-book' },
        { label: 'Manage Users', path: '/admin/users' },
        {label: 'Manage Loans', path:'/admin/Loans'}
      ];
    } else {
      this.isAdmin = false;
      this.navLinks = [
        { label: 'Home', path: '/home' },
        { label: 'My Loans', path: 'user-loans/:userId' },
        { label: 'Profile', path: '/profile' }
      ];
    }
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
