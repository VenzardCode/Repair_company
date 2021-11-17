import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LoginForm} from './login/login-form';
import {RegisterForm} from './register/register-form';
import {ResultForm} from './result-form';
import {RepairForm} from './repair-order/form-repair';
import {UserInterface} from "./auth/user-interface";
import {OrderInfo} from "./profile/order-info";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  public loginSubmit(form:LoginForm): Observable<ResultForm> {
    return this.http.post<ResultForm>('https://repair.firlin123.workers.dev/api/login', form);

  }
  public registerSubmit(form:RegisterForm): Observable<ResultForm> {
    return this.http.post<ResultForm>('https://repair.firlin123.workers.dev/api/register', form);

  }
  public  meRequest():Observable<UserInterface>{
    return  this.http.get<UserInterface>('https://repair.firlin123.workers.dev/api/me');
  }
  public  logoutRequest():Observable<string>{
    return  this.http.get<string>('https://repair.firlin123.workers.dev/api/logout');
  }
  public repairOrderSubmit(form:RepairForm):Observable<string>{
    return this.http.post<string>('https://production.repair.firlin123.workers.dev/api/newOrder', form);
  }
  public getOrders(): Observable<any>{
    return this.http.get<OrderInfo>('https://production.repair.firlin123.workers.dev/api/myOrders');
  }


}
