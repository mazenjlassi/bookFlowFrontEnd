import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { RatingService } from '../../../services/rating/rating.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  book: Book | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBook(bookId);
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

  toggleAvailability(): void {
    if (!this.book) return;
  
    this.bookService.updateAvailability(this.book.id).subscribe({
      next: (msg) => {
        this.book!.isAvailable = !this.book!.isAvailable;
        alert(msg); // shows "Availability updated successfully"
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
      next: (message) => {
        alert(message); // will show: "Book deleted successfully"
        this.router.navigate(['/admin/manage-book']);
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
        alert('Failed to delete book.');
      }
    });
  }
  
}
