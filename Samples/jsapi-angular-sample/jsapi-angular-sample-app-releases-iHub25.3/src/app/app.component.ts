import {Component, OnInit} from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: false,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Sample App';

  userData$: Observable<UserDataResult>;

  configuration$: Observable<OpenIdConfiguration>;

  public isAuthenticated = false;
  public authToken: any;

  public page = 0;

  loading = false;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.loading = true;
    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated,accessToken }) => {
        this.isAuthenticated = isAuthenticated;
        this.authToken = accessToken;
        this.loading = false;
      });
  }

  loginWithPopup() {
      this.loading = true;
      this.oidcSecurityService.authorizeWithPopUp()
      .subscribe(({ isAuthenticated, accessToken }) => {
        this.isAuthenticated = isAuthenticated;
        this.authToken = accessToken;
        this.loading = false;
      });
  }

  login() {
    this.loading = true;
    this.oidcSecurityService.authorize();
}

  logout() {
    this.loading = true;
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => {
        console.log(result);
        this.loading = false;
      });


  }
}
