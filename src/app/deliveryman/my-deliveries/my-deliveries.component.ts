import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';
import { Delivery } from '../../models/delivery';

@Component({
  selector: 'app-my-deliveries',
  standalone: false,
  templateUrl: './my-deliveries.component.html',
  styleUrl: './my-deliveries.component.css'
})
export class MyDeliveriesComponent {
  

  myDeliveries: Delivery[] = [];
  isLoading = true;
  deliveryManId: string | null = null;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    // Get deliveryManId from localStorage (connected user)
    this.deliveryManId = localStorage.getItem('userId');
    if (this.deliveryManId) {
      this.loadMyDeliveries();
    }
  }

  loadMyDeliveries(): void {
    if (!this.deliveryManId) return;

    this.isLoading = true;
    this.deliveryService.getMyDeliveries(this.deliveryManId).subscribe({
      next: deliveries => {
        this.myDeliveries = deliveries;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading my deliveries:', err);
        this.isLoading = false;
      }
    });
  }

}
