import { Component } from '@angular/core';
import { Delivery } from '../../models/delivery';
import { DeliveryService } from '../../services/delivery/delivery.service';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {
  
  deliveries: Delivery[] = [];
  isLoading: boolean = false;

  statusMap: { [key: number]: string } = {
    0: 'EN ATTENTE',
    1: 'EN COURS',
    2: 'LIVRE'
  };

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.isLoading = true;
    this.deliveryService.getAllDeliveries().subscribe({
      next: (data) => {
        this.deliveries = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load deliveries:', err);
        this.deliveries = [];
        this.isLoading = false;
      }
    });
  }

  refresh(): void {
    this.loadDeliveries();
  }

  getStatusText(status: number | string): string {
    if (typeof status === 'number') return this.statusMap[status] ?? 'Unknown';
    return status; // already string
  }

}
