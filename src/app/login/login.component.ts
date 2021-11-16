import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {LoginForm} from "./login-form";
import {AuthService} from '../auth/auth.service';
import {ResultForm} from "../result-form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  LoginForm;
  hide = true;
  message!: string;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public authService: AuthService) {
    this.LoginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    this.LoginForm.controls['email'].addValidators([Validators.required]);
    this.LoginForm.controls['password'].addValidators([Validators.required]);
  }


  onSubmit() {
    if (this.LoginForm.valid == false) {
      console.log('Form not valid')
    } else {
      const body: LoginForm = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password
      };
      this.httpService.loginSubmit(body).subscribe(res => {
        if (res) {

          this.login(res);
          console.log(res);

        }
      }, error => {
        console.log(error);
      });
      console.log('Your form data : ', body);
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path])
  }




  login(res:ResultForm) {

    this.authService.login(res).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/profile';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
