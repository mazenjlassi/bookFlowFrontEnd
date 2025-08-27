import { Component } from '@angular/core';
import { DeliveryManService } from '../../../services/DeliveryManService/delivery-man-service.service';
import { CreateDeliveryManDto } from '../../../models/create-delivery-man-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-man',
  standalone: false,
  templateUrl: './delivery-man.component.html',
  styleUrl: './delivery-man.component.css'
})
export class DeliveryManComponent {
  
  deliveryMan: CreateDeliveryManDto = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    vehicleNumber: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private deliveryManService: DeliveryManService , private router: Router) {}

  createDeliveryMan(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.deliveryManService.createDeliveryMan(this.deliveryMan)
      .subscribe({
        next: (res) => {
          this.successMessage = 'Delivery man created successfully!';
          this.isLoading = false;
          this.deliveryMan = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '',
            vehicleNumber: ''
          };
          this.router.navigate(['admin/delivery-man'])
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to create delivery man.';
          this.isLoading = false;
        }
      });
  }

}
