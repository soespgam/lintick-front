import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseLogin } from 'src/app/login/interface/login.interface';
import { Employee } from '../../interface/employee.interface';

import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HttpEmployeeService {

  public userStorage: ResponseLogin = JSON.parse(
    sessionStorage.getItem('auth')!
  );

  public headers = new HttpHeaders()
    .set("Authorization", 'Bearer ' + this.userStorage.access_token)
    .set("Access-Control-Allow-Origin", "*")
    .set('Content-Type', 'application/json')


  constructor(public http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}${environment.httpUrls.employee.getList}`,
      {
        headers: this.headers
      }
    );
  }

  public employeeCreate(employeeCreate: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.baseUrl}${environment.httpUrls.employee.create}`, employeeCreate,
      {
        headers: this.headers
      });
  }

  public updateEmployee(employeeUpdate: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${environment.baseUrl}${environment.httpUrls.employee.update(employeeUpdate.id!)}`, employeeUpdate,
      {
        headers: this.headers
      });
  }

  public deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${environment.baseUrl}${environment.httpUrls.employee.delete(id)}`,
      {
        headers: this.headers
      });
  }
}

