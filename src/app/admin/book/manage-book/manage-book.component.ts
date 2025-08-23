import { Component } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { Router } from '@angular/router';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-manage-book',
  standalone: false,
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.css'
})
export class ManageBookComponent {
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
    this.router.navigate(['/admin/book',book.id]);
  }

  goToAddBook(): void {
    this.router.navigate(['/admin/book-add']);
  }

}
