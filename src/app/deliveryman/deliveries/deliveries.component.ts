import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';
import { Delivery } from '../../models/delivery';

@Component({
  selector: 'app-deliveries',
  standalone: false,
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css'
})
export class DeliveriesComponent {

  pendingDeliveries: Delivery[] = [];
  isLoading = true;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.fetchPendingDeliveries();
  }

  fetchPendingDeliveries(): void {
    this.isLoading = true;
    this.deliveryService.getPendingDeliveries().subscribe({
      next: (data) => {
        this.pendingDeliveries = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching pending deliveries:', err);
        this.isLoading = false;
      }
    });
  }

  assignDelivery(deliveryId: string): void {
    const deliveryManId = localStorage.getItem('userId');
    if (!deliveryManId) {
      alert('No deliveryman logged in!');
      return;
    }

    this.deliveryService.assignDelivery(deliveryId, deliveryManId).subscribe({
      next: updatedDelivery => {
        alert(`Delivery assigned to you!`);
        this.fetchPendingDeliveries(); // refresh list
      },
      error: err => {
        console.error('Error assigning delivery', err);
      }
    });
  }

}
