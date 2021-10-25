import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  constructor(public httpClient: HttpClient) {}
  getCategory() {
    return this.httpClient.get('http://localhost:8080/product-category');
  }
  getProduct() {
    return this.httpClient.get('http://localhost:8080/product');
  }
  getProductByPagination(pageNo: any, pageSize: any) {
    return this.httpClient.get(
      `http://localhost:8080/product/${pageNo}/${pageSize}`
    );
  }
  getProductById(id: any) {
    return this.httpClient.get(`http://localhost:8080/product/${id}`);
  }
  getCategoryById(id: any) {
    return this.httpClient.get(`http://localhost:8080/product-category/${id}`);
  }

  getCartByUserId(id: any) {
    return this.httpClient.get(`http://localhost:8080/cart/${id}`);
  }
  getCartProduct(id: any) {
    return this.httpClient.get(`http://localhost:8080/cart-product/${id}`);
  }

  getAllCartProduct() {
    return this.httpClient.get(`http://localhost:8080/cart-product`);
  }
}
