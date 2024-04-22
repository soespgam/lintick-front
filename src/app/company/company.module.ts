import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CompanyRoutingModule } from './company-routing.module';

import { CompanyComponent } from './pages/company/company.component';

import { HttpCompanyService } from './service/http-company/http-company.service';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';

@NgModule({
  declarations: [
    CompanyComponent,
    EditCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpCompanyService]
})
export class CompanyModule { }
