import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7256/api/book'; // backend base URL

  constructor(private http: HttpClient) {}

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/get-all`);
  }

  // Get a book by ID (GUID)
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/create`, book);
  }

  // Toggle availability of a book by ID
  updateAvailability(id: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update-availability/${id}`, null);
  }

  // Delete a book by ID
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
