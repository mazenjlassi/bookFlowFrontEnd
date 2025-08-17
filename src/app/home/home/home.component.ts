import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';

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

  constructor(private bookService: BookService , private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = data;
        this.filteredBooks = data; // initially show all
      },
      error: err => console.error(err)
    });
  }
  filterBooksByIsbn(): void {
    this.filteredBooks = this.books.filter(book =>
      this.searchIsbn
        ? book.isbn.toLowerCase().includes(this.searchIsbn.toLowerCase())
        : true
    ).filter(book =>
      this.searchName
        ? book.title.toLowerCase().includes(this.searchName.toLowerCase())
        : true
    );
  }
  
  filterBooksByName(): void {
    this.filteredBooks = this.books.filter(book =>
      this.searchName
        ? book.title.toLowerCase().includes(this.searchName.toLowerCase())
        : true
    ).filter(book =>
      this.searchIsbn
        ? book.isbn.toLowerCase().includes(this.searchIsbn.toLowerCase())
        : true
    );
  }
  
  

  viewBookDetails(book: Book)  {
    this.router.navigate(['/book', book.id]);
  }
}
