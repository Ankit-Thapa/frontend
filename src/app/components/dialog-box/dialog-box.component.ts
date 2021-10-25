import { DeleteService } from './../../services/deleteService/delete.service';
import { SubjectService } from './../../services/shared/subject.service';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent {
  message: string = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  deleteProductId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private SubjectService: SubjectService,
    private DeleteService: DeleteService
  ) {
    this.SubjectService.deleteProductId.subscribe((response) => {
      console.log('id', response);
      this.deleteProductId = response;
    });
    if (data) {
      this.message = data.message || this.message;
    }
  }

  onConfirmClick(): void {
    this.DeleteService.deleteProductById(this.deleteProductId).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.dialogRef.close(true);
  }
}
