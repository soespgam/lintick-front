import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
  },
  {
    path: 'edit-company',
    component: EditCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
