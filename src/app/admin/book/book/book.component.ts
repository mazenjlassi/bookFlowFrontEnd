import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { RatingService } from '../../../services/rating/rating.service';
import { Book } from '../../../models/book';
import { Rating } from '../../../models/rating';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  book: Book | null = null;
  ratings: Rating[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBook(bookId);
      this.loadRatings(bookId);
    }
  }

  loadBook(id: string): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load book:', err);
        this.isLoading = false;
      }
    });
  }

  loadRatings(bookId: string): void {
    this.ratingService.getRatingsByBook(bookId).subscribe({
      next: (data) => {
        this.ratings = data;
      },
      error: (err) => {
        console.error('Failed to load ratings:', err);
      }
    });
  }

  toggleAvailability(): void {
    if (!this.book) return;

    this.bookService.updateAvailability(this.book.id).subscribe({
      next: (msg) => {
        this.book!.isAvailable = !this.book!.isAvailable;
        alert(msg || 'Availability updated successfully.');
        this.router.navigate(['/admin/manage-book']);
      },
      error: (err) => {
        console.error('Failed to update availability:', err);
        alert('Failed to update availability.');
      }
    });
  }

  deleteBook(): void {
    if (!this.book) return;
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        alert('Book deleted successfully.');
        this.router.navigate(['/admin/manage-book']);
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
        alert('Failed to delete book.');
      }
    });
  }
  
  deleteRating(ratingId: string): void {
    if (!confirm("Are you sure you want to delete this rating?")) return;
  
    this.ratingService.deleteRating(ratingId).subscribe({
      next: (msg) => {
        this.ratings = this.ratings.filter(r => r.id !== ratingId);
        alert(msg || "Rating deleted successfully."); // fallback text
      },
      error: (err) => {
        console.error("Failed to delete rating:", err);
        alert("Failed to delete rating.");
      }
    });
  }
  
  
}
