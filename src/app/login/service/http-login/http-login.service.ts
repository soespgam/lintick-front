import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment';
import { Login, ResponseLogin } from '../../interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {
  public headers = new HttpHeaders();
  constructor(public http: HttpClient) { }

  public login(loginAuth: Login): Observable<ResponseLogin> {
    this.headers
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    return this.http.post<ResponseLogin>(`${environment.baseUrl}${environment.httpUrls.login.loginauth}`, loginAuth,
      {
        headers: this.headers
      }
    )
  }

  public logouth(): Observable<Login> {
    return this.http.get<Login>(`${environment.baseUrl}${environment.httpUrls.login.logout}`)
  }
}
