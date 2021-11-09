import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  public loginSubmit(form:any): Observable<any> {
    return this.http.post<any>('https://enp4ac5lpyjwzmq.m.pipedream.net', form);

  }


}
