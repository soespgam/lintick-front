import { Component, OnInit } from '@angular/core';

import { HttpCompanyService } from '../../service/http-company/http-company.service';
import { RedirectService } from '../../../shared/services/redirect.service';
import { LogoutService } from '../../../shared/services/logout.service';

import { Company } from '../../interface/company.interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public listCompanies: Company[];

  constructor(public httpCompany: HttpCompanyService, public redirect: RedirectService, public logout: LogoutService) {
    this.listCompanies = [];
  }
  public ngOnInit(): void {
    this.getCompanies();
  }
  public getCompanies(): void {
    this.httpCompany.getCompanies().subscribe(
      {
        next: (value: Company[]) => {
          console.log("COMPANIES", value)
          this.listCompanies = value;
        },
        error: (err: any) => {
          console.log("ERR GET COM", err)
          alert('Error al traer las compañias')
        }
      }
    );
  }
  public createCompany(): void {
    this.redirect.redirectWithParams('/company/edit-company', { edit: false });
  }
  public updateCompany(company: Company): void {
    this.redirect.redirectWithParams('/company/edit-company', { edit: true, company: JSON.stringify(company) });
  }
  public deleteCompany(id: number): void {
    this.httpCompany.deleteCompany(id).subscribe(
      {
        next: () => {
          this.getCompanies()
          alert(`Se elimino la compañia correctamente`)
        },
        error: (err: any) => {
          console.log("ERR DEl COM", err)
          alert('Error al eliminar la compañias')
        }
      }
    );
  }
}
