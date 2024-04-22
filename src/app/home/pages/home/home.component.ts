import { Component } from '@angular/core';

import { RedirectService } from '../../../shared/services/redirect.service';
import { LogoutService } from '../../../shared/services/logout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public redirect: RedirectService, public logOut: LogoutService) { }

}
