import { DeleteService } from './../../../services/deleteService/delete.service';
import { SubjectService } from './../../../services/shared/subject.service';
import { GetService } from './../../../services/getServices/get.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId: any;
  cartData: any;
  productData: any = [];
  msg = 'Cart is empty';
  totalPrice = 0;
  constructor(
    private SubjectService: SubjectService,
    private getService: GetService,
    private deleteService: DeleteService
  ) {
    console.log('hello');
    this.SubjectService.cartId.subscribe((response) => {
      this.cartId = response;
      console.log('cartid', response);
    });
  }

  ngOnInit(): void {
    this.getService.getCartProduct(this.cartId).subscribe((response) => {
      this.cartData = response;
      this.msg = '';
      for (let i = 0; i < this.cartData.length; i++) {
        console.log(this.cartData[i].productId);
        this.getService
          .getProductById(this.cartData[i].productId)
          .subscribe((response: any) => {
            this.totalPrice = this.totalPrice + response.price;
            console.log(response?.price);
            this.productData = this.productData.concat(response);
            console.log(response);
          });
      }
      console.log(response);
    });
  }

  delete(id: any, index: any) {
    this.cartData.splice(index, 1);
    this.productData.splice(index, 1);
    this.totalPrice = 0;
    for (let i = 0; i < this.productData.length; i++) {
      console.log(this.productData[i]);
      this.totalPrice = this.totalPrice + this.productData[i].price;
    }

    this.deleteService.deleteProductByCartMapping(id).subscribe((response) => {
      console.log(response);
    });
  }
}
