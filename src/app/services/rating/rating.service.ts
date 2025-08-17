import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../../models/rating';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'https://localhost:7256/api/rating';

  constructor(private http: HttpClient) { }

  // Add a new rating
  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }

  // Get rating by ID
  getRatingById(id: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/${id}`);
  }

  // Get all ratings for a book
  getRatingsByBook(bookId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/book/${bookId}`);
  }

  // Get average rating for a book
  getAverageRating(bookId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/book/${bookId}/average`);
  }

  // Get user's rating for a book
  getUserRating(bookId: string, userId: string): Observable<Rating | null> {
    return this.http.get<Rating | null>(`${this.apiUrl}/book/${bookId}/user/${userId}`);
  }
}