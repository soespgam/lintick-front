import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeListComponent,
  },
  {
    path: 'edit-employee',
    component: EditEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
