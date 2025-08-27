// src/app/services/delivery-man/delivery-man.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDeliveryManDto } from '../../models/create-delivery-man-dto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryManService {

  private apiUrl = 'https://localhost:7256/api/deliveryman';

  constructor(private http: HttpClient) { }

  createDeliveryMan(dto: CreateDeliveryManDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

    // ✅ Get all delivery men
    getAllDeliveryMen(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/all`);
    }
}
