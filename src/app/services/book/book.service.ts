import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

// Define a Book interface matching your backend model


@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private apiUrl = 'https://localhost:7256/api/book'; // Fixed double slash

  constructor(private http: HttpClient) {}

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/get-all`);
  }

  // Get book by ISBN
  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/get-by-isbn/${isbn}`);
  }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/create`, book);
  }

  // Toggle availability by ID (GUID)
  updateAvailability(id: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update-availability/${id}`, null);
  }

  // Delete a book
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
