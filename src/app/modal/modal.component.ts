import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../http.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RepairFinishForm} from "./repair-finish-form";
<<<<<<< HEAD
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
=======
>>>>>>> origin/main

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  RepairFinishForm;
<<<<<<< HEAD
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public httpService: HttpService, private formBuilder: FormBuilder,public dialogRef:MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar) {
=======

  constructor(public httpService: HttpService, private formBuilder: FormBuilder,public dialogRef:MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
>>>>>>> origin/main
    this.RepairFinishForm = this.formBuilder.group({
      price: ['',[Validators.required]],
      cause: ['',[Validators.required]]
    });
  }
<<<<<<< HEAD
  openSnackBar(message: string) {
    this._snackBar.open(message,'',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  onSubmit() {
    if (this.RepairFinishForm.valid == false) {

      this.openSnackBar('Form not valid')
    } else {
=======


  onSubmit() {
    if (this.RepairFinishForm.valid == false) {
      console.log('Form not valid')
    } else {
      console.log(this.data.id);
>>>>>>> origin/main
      const body: RepairFinishForm = {
        id:this.data.id,
        price: this.RepairFinishForm.value.price,
        cause: this.RepairFinishForm.value.cause
      };
      this.httpService.repairOrderFinishSubmit(body).subscribe(res => {
        if (res) {

<<<<<<< HEAD
=======
          console.log(res);
>>>>>>> origin/main
          this.data.Done();
          this.closeModal()

        }
      }, error => {
<<<<<<< HEAD
        this.openSnackBar(error.error.error)
=======
        console.log(error);
>>>>>>> origin/main
      });
    }
  }
  public closeModal():void{
    this.dialogRef.close();
  }

}
