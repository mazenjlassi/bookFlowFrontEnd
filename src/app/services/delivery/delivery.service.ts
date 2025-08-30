import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'https://localhost:7256/api/delivery';

  constructor(private http: HttpClient) {}

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getPendingDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/get-pending`);
  }
  
  assignDelivery(deliveryId: string, deliveryManId: string): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/assign/${deliveryId}/${deliveryManId}`, {});
  }


    // Get deliveries assigned to the connected deliveryman
    getMyDeliveries(deliveryManId: string): Observable<Delivery[]> {
      return this.http.get<Delivery[]>(`${this.apiUrl}/get-by-deliveryman/${deliveryManId}`);
    }
}
