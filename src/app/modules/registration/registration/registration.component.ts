import { Router } from '@angular/router';
import { RegistrationService } from './../../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  file: File | undefined;
  constructor(
    public RegistrationService: RegistrationService,
    private HttpClient: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {}

  registrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    profilePic: new FormControl('', [Validators.required]),
  });

  url: any;
  msg = '';

  data = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userType: '',
    password: '',
    // profilePicture: '',
  };

  selectFile(event: any) {
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm?.get('profile')?.setValue(file);
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  submit() {
    this.data.firstName = this.registrationForm.get('firstName')?.value;
    this.data.lastName = this.registrationForm.get('lastName')?.value;
    this.data.email = this.registrationForm.get('email')?.value;
    this.data.mobileNumber = this.registrationForm.get('mobile')?.value;
    this.data.userType = this.registrationForm.get('userType')?.value;
    this.data.password = this.registrationForm.get('password')?.value;
    // this.data.profilePicture = this.registrationForm.get('profilePic')?.value;
    this.RegistrationService.userRegistration(this.data).subscribe((response) =>
      console.log(response)
    );
    this.router.navigate(['../login']);
    // const formData = new FormData();
    // formData.append('file', this.registrationForm?.get('profile')?.value);
    // // --------Post request for uploading image-------------------
    // this.HttpClient.post<any>(
    //   'http://localhost:8080/upload',
    //   formData
    // ).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }
}
