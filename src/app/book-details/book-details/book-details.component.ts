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
export class BookDetailsComponent {
loanBook() {
throw new Error('Method not implemented.');
}  book: Book | null = null;
  bookId: string = '';
  userRating: number = 0;
  userComment: string = '';
  averageRating: number = 0;
  userHasRated: boolean = false;
  isLoading: boolean = false;
  isSubmitting: boolean = false;

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

  loadBookDetails(id: string): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;

        // Load all ratings/comments
        this.loadAllRatings();

        // Load average rating
        this.loadAverageRating();

        // Load user rating
        this.loadUserRating();

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load book:', err);
        this.isLoading = false;
      }
    });
  }

  loadAllRatings(): void {
    if (!this.book) return;

    this.ratingService.getRatingsByBook(this.book.id).subscribe({
      next: (ratings) => {
        this.book!.ratings = ratings;
      },
      error: (err) => console.error('Failed to load ratings:', err)
    });
  }

  loadAverageRating(): void {
    if (!this.book) return;

    this.ratingService.getAverageRating(this.book.id).subscribe({
      next: (avg) => this.averageRating = avg,
      error: (err) => console.error('Failed to get average rating:', err)
    });
  }

  loadUserRating(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || !this.book) return;

    this.ratingService.getUserRating(this.book.id, userId).subscribe({
      next: (rating) => {
        if (rating) {
          this.userRating = rating.score;
          this.userComment = rating.comment || '';
          this.userHasRated = true;
        }
      },
      error: (err) => console.error('Failed to get user rating:', err)
    });
  }

  setUserRating(star: number): void {
    this.userRating = star;
  }

  submitRating(): void {
    if (!this.book || this.userRating < 1 || this.userRating > 5) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.isSubmitting = true;

    const rating: Rating = {
      id: '', // backend generates
      bookId: this.book.id,
      userId: userId,
      score: this.userRating,
      comment: this.userComment,
      date: new Date()
    };

    this.ratingService.addRating(rating).subscribe({
      next: () => {
        this.userHasRated = true;
        this.loadAllRatings();
        this.loadAverageRating();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Failed to submit rating:', err);
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}


