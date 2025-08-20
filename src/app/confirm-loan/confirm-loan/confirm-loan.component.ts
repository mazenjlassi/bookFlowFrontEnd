import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../services/loan/loan.service';

@Component({
  selector: 'app-confirm-loan',
  standalone: false,
  templateUrl: './confirm-loan.component.html',
  styleUrl: './confirm-loan.component.css'
})
export class ConfirmLoanComponent {
  loan:any;
  bookId: string = '';
  userId: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId')!;
    this.userId = localStorage.getItem('userId') || ''; 
  }

  confirmLoan() {
    this.isLoading = true;
    
    this.loanService.createLoan(this.bookId, this.userId).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Loan created successfully!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        
        // Check if the error is about book availability
        if (error.error && error.error.includes('not available')) {
          alert('❌ This book is not available for loan. It may already be checked out by another user.');
        } else {
          alert('Failed to create loan. Please try again.');
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
