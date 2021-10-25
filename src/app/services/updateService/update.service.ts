import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(public httpClient: HttpClient) {}

  updateProduct(data: any) {
    return this.httpClient.patch('http://localhost:8080/product', data);
  }

  updateCategory(data: any) {
    return this.httpClient.patch(
      'http://localhost:8080/product-category',
      data
    );
  }
}
