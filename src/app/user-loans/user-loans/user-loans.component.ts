import { Component } from '@angular/core';
import { LoanService } from '../../services/loan/loan.service';
import { Loan } from '../../models/loan';

@Component({
  selector: 'app-user-loans',
  standalone: false,
  templateUrl: './user-loans.component.html',
  styleUrl: './user-loans.component.css'
})
export class UserLoansComponent {
  

  loans: Loan[] = [];
  userId: string = ''; 
  isLoading: boolean = false;
  error: string = '';

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if(this.userId) {
      this.fetchLoans();
    } else {
      this.error = 'User ID not found!';
    }
  }

  deleteLoan(loanId: string) {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(loanId).subscribe({
        next: () => {
          // Remove deleted loan from the list
          this.loans = this.loans.filter(l => l.id !== loanId);
          alert('Loan deleted successfully.');
        },
        error: (err) => {
          console.error(err);
          alert('Cannot delete this loan. It may not be EN_COURS.');
        }
      });
    }
  }
  

  fetchLoans(): void {
    this.isLoading = true;
    this.loanService.getLoansByUser(this.userId).subscribe({
      next: (data) => {
        this.loans = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to fetch loans';
        this.isLoading = false;
      }
    });
  }
}
