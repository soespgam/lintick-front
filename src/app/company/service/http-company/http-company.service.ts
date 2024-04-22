import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../../interface/company.interface';
import { ResponseLogin } from '../../../login/interface/login.interface';

import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HttpCompanyService {

  public userStorage: ResponseLogin = JSON.parse(
    sessionStorage.getItem('auth')!
  );
  public headers = new HttpHeaders()
    .set("Authorization", 'Bearer ' + this.userStorage.access_token)
    .set("Access-Control-Allow-Origin", "*")
    .set('Content-Type', 'application/json')
  constructor(public http: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.baseUrl}${environment.httpUrls.company.getList}`,
      {
        headers:this.headers
      }
    );
  }
  public createCompany(companyCreate: Company): Observable<Company> {
    return this.http.post<Company>(`${environment.baseUrl}${environment.httpUrls.company.create}`, companyCreate,
    {
      headers:this.headers
    });
  }
  public updateCompany(companyUpdate: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrl}${environment.httpUrls.company.update(companyUpdate.id!)}`, companyUpdate,
    {
      headers:this.headers
    });
  }
  public deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(`${environment.baseUrl}${environment.httpUrls.company.delete(id)}`,
    {
      headers:this.headers
    });
  }
}
