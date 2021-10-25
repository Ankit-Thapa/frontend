import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductRegistrationServiceService {
  constructor(public httpClient: HttpClient) {}
  productRegistration(post: any) {
    console.log(JSON.stringify(post));
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:8080/product/save',
      JSON.stringify(post),
      { headers: httpheader }
    );
  }
}
