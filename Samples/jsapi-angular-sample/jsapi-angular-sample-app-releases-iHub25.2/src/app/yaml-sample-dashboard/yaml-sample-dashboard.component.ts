import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-yaml-sample-dashboard',
  templateUrl: './yaml-sample-dashboard.component.html',
  styleUrls: ['./yaml-sample-dashboard.component.css']
})
export class YamlSampleDashboardComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}

    public isAuthenticated:boolean;
    public authToken: any;

    ngOnInit() {
      this.oidcSecurityService
        .checkAuth()
        .subscribe(({ isAuthenticated,accessToken }) => {
          this.isAuthenticated = isAuthenticated;
          this.authToken = accessToken;
        });
    }

    protected readonly environment = environment;
}
