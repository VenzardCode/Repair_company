import {Component} from '@angular/core';
import {HttpService} from "../http.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterForm} from "./register-form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  hide = true;
  RegisterForm: FormGroup;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private router: Router) {
    this.RegisterForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phone: ['']
    });
    this.RegisterForm.controls['name'].addValidators([Validators.required, Validators.maxLength(40)]);
    this.RegisterForm.controls['email'].addValidators([Validators.required, Validators.email]);
    this.RegisterForm.controls['password'].addValidators([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]{8,255}$/)]);
    this.RegisterForm.controls['phone'].addValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  }


  onSubmit() {
    console.log(this.RegisterForm.valid);
    if (this.RegisterForm.valid == false) {
      console.log('Form not valid')
    } else {
      const body: RegisterForm = {
        name: this.RegisterForm.value.name,
        email: this.RegisterForm.value.email,
        password: this.RegisterForm.value.password,
        phone:'+380'+this.RegisterForm.value.phone
      };
      this.httpService.registerSubmit(body).subscribe(res => {
        if (res) {
          console.log(res);

        }
      }, error => {
        console.log(error.error.error);
      });
      console.log('Your form data : ', body);
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path])
  }


}
