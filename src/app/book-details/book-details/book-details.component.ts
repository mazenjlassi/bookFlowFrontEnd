import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';
import { RatingService } from '../../services/rating/rating.service';
import { AuthService } from '../../services/auth/auth.service';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-book-details',
  standalone: false,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent { book: Book | null = null;
  bookId: string = '';
  userRating: number = 0;
  averageRating: number = 0;
  userHasRated: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private ratingService: RatingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get book ID from route
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBookDetails(this.bookId);
  }

  // Load book data by ID
  loadBookDetails(id: string): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        this.loadRatingData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load book:', err);
        this.isLoading = false;
      }
    });
  }

  // Load average rating and user rating if exists
  loadRatingData(): void {
    if (!this.book) return;

    // Get average rating
    this.ratingService.getAverageRating(this.book.id).subscribe({
      next: (avg) => this.averageRating = avg,
      error: (err) => console.error('Failed to get average rating:', err)
    });

    // Get user rating
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.ratingService.getUserRating(this.book.id, userId).subscribe({
        next: (rating) => {
          if (rating) {
            this.userRating = rating.score;
            this.userHasRated = true;
          }
        },
        error: (err) => console.error('Failed to get user rating:', err)
      });
    }
  }

  // Handle star click
  setUserRating(star: number): void {
    if (!this.userHasRated) {
      this.userRating = star;
    }
  }

  // Submit the rating
  submitRating(): void {
    if (!this.book || this.userRating < 1 || this.userRating > 5) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;

    const rating: Rating = {
      id: '', // backend generates
      bookId: this.book.id,
      userId: userId,
      score: this.userRating,
      date: new Date()
    };

    this.ratingService.addRating(rating).subscribe({
      next: () => {
        this.userHasRated = true;
        this.loadRatingData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to submit rating:', err);
        this.isLoading = false;
      }
    });
  }

  // Navigate back to home
  goBack(): void {
    this.router.navigate(['/home']);
  }
}


