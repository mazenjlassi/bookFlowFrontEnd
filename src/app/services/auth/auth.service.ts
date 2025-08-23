import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  private apiUrl = 'https://localhost:7256/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // Register method
  register(userData: { username: string; fullName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login method
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
    
  }

  // Save token in local storage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  
  

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserId(): string | null {
    return localStorage.getItem('userId'); // assuming you store userId on login
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    this.router.navigate(['/login']);
  }

  getCurrentUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload: any = jwtDecode(token);
    // Based on your JWT, the role claim key is: 
    // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }
  
  
  

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  
}
}