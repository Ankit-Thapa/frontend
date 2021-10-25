import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(public httpClient: HttpClient) {}

  userRegistration(post: any) {
    console.log(JSON.stringify(post));
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:8080/users',
      JSON.stringify(post),
      { headers: httpheader }
    );
  }

  categoryRegistration(data: any) {
    console.log(JSON.stringify(data));
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:8080/product-category/save',
      JSON.stringify(data),
      { headers: httpheader }
    );
  }

  cartRegistration(data: any) {
    console.log(JSON.stringify(data));
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:8080/cart',
      JSON.stringify(data),
      { headers: httpheader }
    );
  }

  cartProductRegistration(data: any) {
    console.log(JSON.stringify(data));
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:8080/cart-product',
      JSON.stringify(data),
      { headers: httpheader }
    );
  }
}
