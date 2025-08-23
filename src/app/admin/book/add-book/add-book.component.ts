import { Component } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { Router } from '@angular/router';
import { Book } from '../../../models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  // Only include fields required by CreateBookDto
  book = {
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishedDate: '',
    description: '',
    thumbnailUrl: '',
    isAvailable: true,
    loans: [],
    ratings: []
    
    
  };

  constructor(private bookService: BookService , private router: Router) {}

  addBook(): void {
    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        console.log('Book added:', response);
        alert('Book added successfully!');
        this.router.navigate(['/admin/manage-book']);

        // Reset form
        this.book = {
          title: '',
          author: '',
          isbn: '',
          publisher: '',
          publishedDate: '',
          description: '',
          thumbnailUrl: '',
          isAvailable: true,
          loans: [],
          ratings: []
          
        };
      },
      error: (error) => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Check console for details.');
      }
    });
  }
}

