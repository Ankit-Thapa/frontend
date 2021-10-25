import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  constructor(public httpClient: HttpClient) {}
  deleteProductById(id: any) {
    return this.httpClient.delete(`http://localhost:8080//product/${id}`);
  }
  deleteProductByCartMapping(id: any) {
    return this.httpClient.delete(`http://localhost:8080/cart-product/${id}`);
  }
}
