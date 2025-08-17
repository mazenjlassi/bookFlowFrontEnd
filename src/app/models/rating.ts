export interface Rating {
    id: string;
    score: number;          // Rating value (1-5)
    
    date: Date;
    bookId: string;         // ID of the book being rated
    userId: string;         // ID of the user who rated
  }