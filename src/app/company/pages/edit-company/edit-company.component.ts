import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Company } from '../../interface/company.interface';

import { RedirectService } from '../../../shared/services/redirect.service';
import { HttpCompanyService } from '../../service/http-company/http-company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  public editState: string = 'false';
  public companyToUpdate: Company;
  public companyForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      web_site: new FormControl('', [Validators.required])
    }
  )
  constructor(public activateRoute: ActivatedRoute, public redirect: RedirectService, public httpCompany: HttpCompanyService) {
    this.companyToUpdate = {
      email: '',
      logo: '',
      name: '',
      web_site: '',
      id: 1
    }
  }

  public ngOnInit(): void {
    this.editState = this.activateRoute.snapshot.queryParamMap.get('edit')!;
    
    if (this.editState === 'true') {
      this.companyToUpdate = JSON.parse(this.activateRoute.snapshot.queryParamMap.get('company')!)
      this.companyForm.setValue(
        {
          email: this.companyToUpdate.email,
          logo: this.companyToUpdate.logo,
          name: this.companyToUpdate.name,
          web_site: this.companyToUpdate.web_site,
        }
      )
    }
  }
  public action(): void {
    this.editState === 'true' ? this.editCompany() : this.createCompany();
  }
  public back(): void {
    this.redirect.redirect('/company/company');
  }
  public body(): Company {
    return {
      name: this.companyForm.get('name')?.value!,
      email: this.companyForm.get('email')?.value!,
      logo: this.companyForm.get('logo')?.value!,
      web_site: this.companyForm.get('web_site')?.value!
    }
  }
  public createCompany(): void {
    const companyCreate: Company = { ...this.body() };
    this.httpCompany.createCompany(companyCreate).subscribe(
      {
        next: (value: Company) => {
          alert(`Se creo la compañia correctamente de ID:${value.id}`)
          this.back();
        },
        error: (err: any) => {
          console.log("ERR CREATE COM", err)
          alert('Error al crear la compañias')
        }
      }
    );
  }
  public editCompany(): void {
    const companyUpdate: Company = { id: this.companyToUpdate.id, ...this.body() };
    this.httpCompany.updateCompany(companyUpdate).subscribe(
      {
        next: (value: Company) => {
          alert(`Se actualizo la compañia correctamente de ID:${value.id}`)
          this.back();
        },
        error: (err: any) => {
          console.log("ERR UPDATE COM", err)
          alert('Error al actualizar la compañias')
        }
      }
    );
  }
}
