import { Component } from '@angular/core';
import { DeliveryManService } from '../../../services/DeliveryManService/delivery-man-service.service';
import { Router } from '@angular/router';
import { CreateDeliveryManDto } from '../../../models/create-delivery-man-dto';

@Component({
  selector: 'app-manage-delivery-man',
  standalone: false,
  templateUrl: './manage-delivery-man.component.html',
  styleUrl: './manage-delivery-man.component.css'
})
export class ManageDeliveryManComponent {
  deliveryMen: CreateDeliveryManDto[] = [];
  isLoading: boolean = true;

  constructor(private deliveryManService: DeliveryManService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDeliveryMen();
  }

  fetchDeliveryMen() {
    this.deliveryManService.getAllDeliveryMen().subscribe({
      next: (data) => {
        this.deliveryMen = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching delivery men', err);
        this.isLoading = false;
      }
    });
  }
  gotoAdd(): void {
    this.router.navigate(['admin/delivery-man']);
  }

}
