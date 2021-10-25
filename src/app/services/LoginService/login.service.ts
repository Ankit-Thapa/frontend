import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public httpClient: HttpClient) {}
  authenticate(email: string, password: string) {
    console.log(email, password);
    let params = new HttpParams({
      fromString: 'email=' + email + '&password=' + password,
    });
    return this.httpClient.post('http://localhost:8080/login', params);
  }
}
