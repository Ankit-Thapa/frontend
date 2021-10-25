import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor() {}
  cartCount = new BehaviorSubject('0');
  productCount = new BehaviorSubject('0');
  deleteProductId = new Subject();
  cartId = new BehaviorSubject('0');
}
