import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpLoginService } from '../../service/http-login/http-login.service';
import { RedirectService } from '../../../shared/services/redirect.service';

import { Login, ResponseLogin } from '../../interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  )

  constructor(public httpLoginService: HttpLoginService, public redirect: RedirectService) { }

  public login(): void {
    const dataLogin: Login = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    }
    this.httpLoginService.login(dataLogin).subscribe(
      {
        next: (value: ResponseLogin) => {
          console.log("www0", value);
          sessionStorage.setItem("auth", JSON.stringify(value));
          this.redirect.redirect('/home/home')
        },
        error: (err: any) => {
          console.log("ERR LOGIN COM", err)
          alert('Error al loguearse')
        }
      }
    )
  }
}
