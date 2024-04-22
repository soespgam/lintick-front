import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { HttpEmployeeService } from './service/http-employee/http-employee.service';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],providers:[HttpEmployeeService]
})
export class EmployeeModule { }
