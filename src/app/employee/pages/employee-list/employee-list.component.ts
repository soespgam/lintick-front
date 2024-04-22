import { Component } from '@angular/core';

import { Employee } from '../../interface/employee.interface';

import { HttpEmployeeService } from '../../service/http-employee/http-employee.service';
import { RedirectService } from '../../../shared/services/redirect.service';
import { LogoutService } from '../../../shared/services/logout.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  public listEmployees: Employee[];

  constructor(public httpEmployee: HttpEmployeeService, public redirect: RedirectService, public logout: LogoutService) {
    this.listEmployees = [];
  }

  public ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.httpEmployee.getEmployees().subscribe({
      next: (value: Employee[]) => {
        console.log("EMPLOYEES", value)
        this.listEmployees = value;
      },
      error: (err: any) => {
        console.log("ERR GET COM", err)
        alert('Error al traer los empleados')
      }
    }
    );
  }

  public createEmployee(): void {
    this.redirect.redirectWithParams('/employee/edit-employee', { edit: false })
  }

  public updateEmployee(employee: Employee): void {
    this.redirect.redirectWithParams('/employee/edit-employee', { edit: true, employee: JSON.stringify(employee) });
  }

  public deleteEmployee(id: number): void {
    this.httpEmployee.deleteEmployee(id).subscribe(
      {
        next: () => {
          this.getEmployees();
          alert(`Se elimino el empleado correctamente`)
        },
        error: (err: any) => {
          console.log("ERR DEl COM", err)
          alert('Error al eliminar el empleado')
        }
      }
    );
  }
}
