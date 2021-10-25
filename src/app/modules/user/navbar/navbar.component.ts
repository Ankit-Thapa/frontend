import { GetService } from './../../../services/getServices/get.service';
import { SubjectService } from './../../../services/shared/subject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  value = false;
  pcount: any;
  cartCount: any;
  cartId: any;
  cartData: any;
  constructor(
    private SubjectService: SubjectService,
    private getService: GetService
  ) {
    this.SubjectService.productCount.subscribe((response) => {
      this.pcount = response;
    });
    this.SubjectService.cartCount.subscribe((response) => {
      this.cartCount = response;
    });
    this.SubjectService.cartId.subscribe((response) => {
      this.cartId = response;
      console.log('navbar cartid', response);
    });
  }

  ngOnInit(): void {}
}
