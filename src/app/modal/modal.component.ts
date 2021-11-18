import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../http.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RepairFinishForm} from "./repair-finish-form";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  RepairFinishForm;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder,public dialogRef:MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.RepairFinishForm = this.formBuilder.group({
      price: ['',[Validators.required]],
      cause: ['',[Validators.required]]
    });
  }


  onSubmit() {
    if (this.RepairFinishForm.valid == false) {
      console.log('Form not valid')
    } else {
      console.log(this.data.id);
      const body: RepairFinishForm = {
        id:this.data.id,
        price: this.RepairFinishForm.value.price,
        cause: this.RepairFinishForm.value.cause
      };
      this.httpService.repairOrderFinishSubmit(body).subscribe(res => {
        if (res) {

          console.log(res);
          this.data.Done();
          this.closeModal()

        }
      }, error => {
        console.log(error);
      });
    }
  }
  public closeModal():void{
    this.dialogRef.close();
  }

}
