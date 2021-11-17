import { Component } from '@angular/core';
import {RepairForm} from './form-repair'
import {HttpService} from "../http.service";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-repair-order',
  templateUrl: './repair-order.component.html',
  styleUrls: ['./repair-order.component.css']
})
export class RepairOrderComponent {
  RepairForm;
  constructor(public httpService: HttpService, private formBuilder: FormBuilder) {
    this.RepairForm = this.formBuilder.group({
      item: ['',[Validators.required]],
      defect: ['',[Validators.required]]
    });
  }
  onSubmit() {
    if (this.RepairForm.valid == false) {
      console.log('Form not valid')
    } else {
      const body: RepairForm = {
        item: this.RepairForm.value.item,
        defect: this.RepairForm.value.defect
      };
      this.httpService.repairOrderSubmit(body).subscribe(res => {
        if (res) {

          console.log(res);

        }
      }, error => {
        console.log(error);
      });
    }
  }

}
