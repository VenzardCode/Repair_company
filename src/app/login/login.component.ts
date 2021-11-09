import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  password:string='password';
  email:string='email'
  hide = true;
  loginForm;
  constructor(public httpService: HttpService,private formBuilder: FormBuilder ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });  }
  emailFormControl = new FormControl( '',[Validators.required, Validators.email]);
  passwordFormControl = new FormControl( '',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]{8,255}$/)]);


  onSubmit() {
    console.log(this.loginForm.valid);
    var body = { email:this.loginForm.value.email,
      password:this.loginForm.value.password
    };
    this.httpService.loginSubmit(body).subscribe();
    console.log('Your form data : ', body );
  }


}
