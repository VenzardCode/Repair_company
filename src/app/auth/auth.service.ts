import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ResultForm} from "../result-form";
import {HttpService} from "../http.service";
import {ifStmt} from "@angular/compiler/src/output/output_ast";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpService: HttpService) {
    this.isAuthenticated()
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(res: ResultForm): Observable<boolean> {
    localStorage.setItem('token', res.token)
    if ('expirationTtl' in res) {
      const rez = Date.now() + (res.expirationTtl ?? 0) * 1000;
      localStorage.setItem('tokenExp', rez.toString());
    }
    return of(true).pipe(
      tap(() => true)
    );
  }

  logout(): void {
    this.httpService.logoutRequest().subscribe(res => {
      if (res) {

        console.log(res);

      }
    }, error => {
      console.log(error.error.error);
    });

    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp');
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public getTokenExp(): number {
    return parseInt(localStorage.getItem('tokenExp') ?? '0');
  }

  tokenNotExpired(exp: number): boolean {
    return exp === 0 ? true : (Date.now() < exp);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    const exp = this.getTokenExp();
    // return a boolean reflecting
    // whether or not the token is expired
    console.log(exp, token);
    // console.trace();
    if (!(this.tokenNotExpired(exp))) {
      this.logout()
    }
    return token === '' ? false : this.tokenNotExpired(exp);
  }
}
