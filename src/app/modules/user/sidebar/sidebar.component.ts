import { GetService } from './../../../services/getServices/get.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './../../../services/registration.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private RegistrationService: RegistrationService,
    private GetService: GetService
  ) {}
  data: any;
  ngOnInit() {
    this.GetService.getCategory().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }

  productCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  categoryData: any = {
    name: '',
  };

  submitCategort() {
    this.categoryData.name = this.productCategoryForm.get('name')?.value;
    let status;
    this.RegistrationService.categoryRegistration(this.categoryData).subscribe(
      (response) => {
        console.log(response);
      }
    );
    alert('sucessfully submitted');
    window.location.reload();
  }
  editCategory() {}
  updateCategory() {}
}
