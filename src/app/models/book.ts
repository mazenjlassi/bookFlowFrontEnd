export interface Book {
    id: string;            // Guid in backend → string in frontend
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishedDate: string;
    description: string;
    thumbnailUrl: string;
    isAvailable: boolean;
  
    loans?: any[];   // You can replace `any` with a Loan interface if you have it
    ratings?: any[]; // Same for Rating interface
  }
  