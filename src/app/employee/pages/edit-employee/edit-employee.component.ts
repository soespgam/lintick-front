import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../../interface/employee.interface';

import { RedirectService } from '../../../shared/services/redirect.service';
import { HttpEmployeeService } from '../../service/http-employee/http-employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  public editState: string = 'false';
  public employeeUpdate: Employee;
  public employeeForm = new FormGroup(
    {
      full_name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required])
    }
  )

  constructor(public activateRoute: ActivatedRoute, public redirect: RedirectService, public httpEmployee: HttpEmployeeService) {
    this.employeeUpdate = {
      full_name: '',
      company_name: '',
      email: '',
      rol: ''
    }
  }
  public ngOnInit(): void {
    this.editState = this.activateRoute.snapshot.queryParamMap.get('edit')!;

    console.log("EMEME", this.employeeUpdate)
    if (this.editState === 'true') {
      this.employeeUpdate = JSON.parse(this.activateRoute.snapshot.queryParamMap.get('employee')!)
      this.employeeForm.setValue(
        {
          full_name: this.employeeUpdate.full_name,
          company_name: this.employeeUpdate.company_name,
          email: this.employeeUpdate.email,
          rol: this.employeeUpdate.rol,
        }
      )
    }
  }
  public action(): void {
    this.editState === 'true' ? this.editEmployee() : this.createEmployee();
  }
  public back(): void {
    this.redirect.redirect('/employee/employee');
  }
  public body(): Employee {
    return {
      full_name: this.employeeForm.get('full_name')?.value!,
      company_name: this.employeeForm.get('company_name')?.value!,
      email: this.employeeForm.get('email')?.value!,
      rol: this.employeeForm.get('rol')?.value!,
    }
  }
  public createEmployee(): void {
    const employeeCreate: Employee = { ...this.body() };
    this.httpEmployee.employeeCreate(employeeCreate).subscribe(
      {
        next: (value: Employee) => {
          console.log("RES", value)
          alert(`Se creo el empleado correctamente de ID:${value.id}`)
          this.back();
        },
        error: (err: any) => {
          console.log("ERR CREATE COM", err)
          alert('Error al crear el empleado')
        }
      }
    );
  }
  public editEmployee(): void {
    const companyUpdate: Employee = { id: this.employeeUpdate.id, ...this.body() };
    this.httpEmployee.updateEmployee(companyUpdate).subscribe(
      {
        next: (value: Employee) => {
          console.log("RESED", value)
          alert(`Se actualizo el empleado correctamente de ID:${value.id}`)
          this.back();
        },
        error: (err: any) => {
          console.log("ERR UPDATE COM", err)
          alert('Error al actualizar el empleado')
        }
      }
    );
  }
}
