import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  status: string;
  loanDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'https://localhost:7256/api/loan'; 

  constructor(private http: HttpClient) {}

  createLoan(bookId: string, userId: string): Observable<Loan> {
    const requestBody = {
      bookId: bookId,
      userId: userId
    };
    
    console.log('Sending to API:', JSON.stringify(requestBody, null, 2));
    
    return this.http.post<Loan>(`${this.apiUrl}/add`, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('API Error details:', error);
        if (error.error) {
          console.error('API Error response:', error.error);
        }
        return throwError(() => error);
      })
    );
  }

  getLoanById(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }
}
