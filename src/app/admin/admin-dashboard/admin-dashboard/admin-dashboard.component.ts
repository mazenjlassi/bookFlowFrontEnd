import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { LoanService } from '../../../services/loan/loan.service';
import { UserService } from '../../../services/user/user.service';
import { ChartConfiguration, ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  booksCount: number = 0;
  loansCount: number = 0;
  usersCount: number = 0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Chart configuration
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Library Statistics' }
    },
    scales: {
      x: { title: { display: true, text: 'Category' } },
      y: { title: { display: true, text: 'Count' }, beginAtZero: true }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Books', 'Loans', 'Users'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
      }
    ]
  };

  constructor(
    private bookService: BookService,
    private loanService: LoanService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.booksCount = books.length;
      this.updateChart();
    });

    this.loanService.getAllLoans().subscribe((loans) => {
      this.loansCount = loans.length;
      this.updateChart();
    });

    this.userService.getAllUsers().subscribe((users) => {
      this.usersCount = users.length;
      this.updateChart();
    });
  }

  updateChart(): void {
    this.barChartData.datasets[0].data = [this.booksCount, this.loansCount, this.usersCount];
    this.chart?.update();
  }
}
