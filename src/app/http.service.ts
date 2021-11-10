import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LoginForm} from './login/login-form';
import {RegisterForm} from './register/register-form';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  public loginSubmit(form:LoginForm): Observable<LoginForm> {
    return this.http.post<LoginForm>('https://repair.firlin123.workers.dev/api/login', form);

  }
  public registerSubmit(form:RegisterForm): Observable<RegisterForm> {
    return this.http.post<RegisterForm>('https://repair.firlin123.workers.dev/api/register', form);

  }


}
