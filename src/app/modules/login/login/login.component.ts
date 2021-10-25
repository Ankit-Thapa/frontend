import { SubjectService } from './../../../services/shared/subject.service';
import { RegistrationService } from './../../../services/registration.service';
import { GetService } from './../../../services/getServices/get.service';
import { LoginService } from '../../../services/LoginService/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Interface/cart';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  status: any;
  value = false;
  msg: any;
  constructor(
    private LoginService: LoginService,
    private router: Router,
    private GetService: GetService,
    private RegistrationService: RegistrationService,
    private SubjectService: SubjectService
  ) {
    this.SubjectService.cartId.subscribe((response) => {
      console.log(response);
    });
  }
  ngOnInit(): void { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  cartData: Cart = {
    userId: 0,
    isActive: false,
  };
  login() {
    this.LoginService.authenticate(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    ).subscribe(async (response) => {
      try {
        this.status = await response;
        console.log('response data?', this.status.id);
      } catch (error) {
        console.log('Error happened here!');
        console.error(error);
      }
      if (this.status.status === 'true') {
        let tempStatus: any;
        let tempUserId;
        this.GetService.getCartByUserId(this.status.id).subscribe(
          async (response: any) => {
            tempUserId = await response;
            console.log('getCartId Response', response);
            for (let i = 0; i < response.length; i++) {

              if (response[i].isActive === true) {
                tempStatus = 1;
                tempUserId = response[i].id;
              }
            }
            if (tempStatus !== undefined) {
              console.log('temp user id', tempStatus);
              this.SubjectService.cartId.next(tempUserId);
            }
          }
        );

        if (tempStatus === undefined) {
          console.log('im inside', this.status.id);
          this.cartData.userId = this.status.id;
          this.cartData.isActive = true;
          console.log('cart Data', this.cartData);
          this.RegistrationService.cartRegistration(this.cartData).subscribe(
            (response) => {
              console.log(response);
            }
          );
        }
        this.router.navigate(['../homepage']);
      } else {
        this.value = true;
        this.msg = 'enter correct email and password';
      }
    });
  }
}
