import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";
import {NgIf} from "@angular/common";


@Component({
    selector: 'app-yaml-sample-dashboard',
    templateUrl: './yaml-sample-dashboard.component.html',
    imports: [
        NgIf
    ],
    styleUrls: ['./yaml-sample-dashboard.component.css'],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
