import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  searchIsbn: string = '';
  searchName: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = data;
        this.filteredBooks = data;
      },
      error: err => console.error(err)
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.isbn.toLowerCase().includes(this.searchIsbn.toLowerCase()) &&
      book.title.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
  showMore(book: any) {
    // For now, just alert or console log
    alert(`More about "${book.title}":\n\n${book.description}`);
    // Or open a modal, navigate, etc.
  }
  

}
