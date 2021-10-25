import { CartProduct } from './../../../Interface/cartProduct';
import { UpdateService } from './../../../services/updateService/update.service';
import { SubjectService } from './../../../services/shared/subject.service';
import { GetService } from './../../../services/getServices/get.service';
import { Router } from '@angular/router';
import { RegistrationService } from './../../../services/registration.service';
import { ProductRegistrationServiceService } from './../../../services/productRegistrationService/product-registration-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  url: any;
  msg = '';
  notEmptyPost = true;
  notScrolly = true;
  cartId: any;
  constructor(
    private ProductRegistrationServiceService: ProductRegistrationServiceService,
    private RegistrationService: RegistrationService,
    private router: Router,
    private GetService: GetService,
    private SubjectService: SubjectService,
    private spinner: NgxSpinnerService,
    private UpdateService: UpdateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.SubjectService.productCount.subscribe((response) => {
      this.productCount = response;
    });

    this.SubjectService.cartCount.subscribe((response) => {
      this.cartCount = response;
    });

    this.SubjectService.deleteProductId.subscribe((response) => {
      console.log(response);
    });

    this.SubjectService.cartId.subscribe((response) => {
      this.cartId = response;
      // console.log('cartid = ', this.cartId);
      console.log('cartid = ', this.cartId);
      this.GetService.getCartProduct(this.cartId).subscribe((response) => {
        let n = 0;
        for (let cartProduct in response) {
          console.log('cartProduct', cartProduct);
          n++;
          console.log('n', n);
        }
        this.cCount = n;
        this.SubjectService.cartCount.next(n.toString());
      });
    });
  }

  productCount: any;
  cartCount: any;
  cCount = 0;
  categories: any;
  products: any;
  pageNo: any = 0;
  pageSize: any = 8;
  tempObj = {};

  ngOnInit() {
    this.GetService.getCategory().subscribe((response) => {
      this.categories = response;
      console.log(this.data);
    });

    this.GetService.getProductByPagination(
      this.pageNo,
      this.pageSize
    ).subscribe((response) => {
      this.products = Object.assign(response);
      this.SubjectService.productCount.next(this.products.length);
      console.log(this.products);
    });
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.minLength(3)]),
    detail: new FormControl('', [Validators.required, Validators.minLength(3)]),
    feature: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    productCategoryId: new FormControl('', [Validators.required]),
    dateCreated: new FormControl('', [Validators.required]),
    dateModified: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  productCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  data: any = {
    name: '',
    price: '',
    detail: '',
    feature: '',
    productCategoryId: '',
    dateCreated: '',
    dateModified: '',
    image: '',
  };

  categoryData: any = {
    name: '',
  };
  selectFile(event: any) {
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm?.get('profilePic')?.setValue(file);
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  submit() {
    for (const key in this.categories) {
      if (
        this.categories[key].name ==
        this.productForm.get('productCategoryId')?.value
      ) {
        this.data.productCategoryId = this.categories[key].id;
      }
    }
    this.data.name = this.productForm.get('name')?.value;
    this.data.price = this.productForm.get('price')?.value;
    this.data.detail = this.productForm.get('detail')?.value;
    this.data.feature = this.productForm.get('feature')?.value;
    this.data.dateCreated = new Date();
    this.data.dateModified = new Date();

    this.ProductRegistrationServiceService.productRegistration(
      this.data
    ).subscribe((response) => console.log(response));
    alert('sucessfully submitted');
    window.location.reload();
  }
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

  cartProduct = {} as CartProduct;

  addToCart(productId: any) {
    this.cartProduct.productId = productId;
    this.cartProduct.cartId = this.cartId;
    console.log(this.cartProduct);
    this.RegistrationService.cartProductRegistration(
      this.cartProduct
    ).subscribe((response) => {
      console.log(response);
    });

    this.cCount++;
    this.cartCount = this.cCount;
    this.SubjectService.cartCount.next(this.cartCount);
  }
  onScroll() {
    if (this.notScrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notScrolly = false;
      this.pageNo++;
      setTimeout(() => {
        this.GetService.getProductByPagination(
          this.pageNo,
          this.pageSize
        ).subscribe((response) => {
          this.products = this.products.concat(response);
          this.SubjectService.productCount.next(this.products.length);
          this.spinner.hide();
          this.notScrolly = true;
          console.log(this.products);
        });
      }, 2000);
    }

    console.log('scrolled');
  }

  editProductData: any;
  editProduct(id: any) {
    this.GetService.getProductById(id).subscribe((response) => {
      this.editProductData = response;
      this.productForm.patchValue({
        name: this.editProductData.name,
        price: this.editProductData.price,
        detail: this.editProductData.detail,
        feature: this.editProductData.feature,
      });
      console.log(this.editProductData);
    });
  }

  update() {
    this.data.productCategoryId = this.editProductData.productCategoryId;
    this.data.name = this.productForm.get('name')?.value;
    this.data.price = this.productForm.get('price')?.value;
    this.data.detail = this.productForm.get('detail')?.value;
    this.data.feature = this.productForm.get('feature')?.value;
    this.data.dateCreated = this.editProductData.dateCreated;
    let ids: any = {
      id: '',
    };
    ids.id = this.editProductData.id;
    const updatedData = { ...this.data, ...ids };
    console.log(updatedData);
    this.UpdateService.updateProduct(updatedData).subscribe((response) => {
      console.log('hello', response);
    });
    alert('sucessfully updated');
    window.location.reload();
  }

  openDialog(productId: any, index: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      panelClass: 'dialog-container-custom',

      data: {
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });
    this.SubjectService.deleteProductId.next(productId);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.products.splice(index, 1);
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('successfully Deleted', 'msg', {
          duration: 2000,
        });
      }
    });
  }
}
