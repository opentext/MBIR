import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-yaml-sample-report',
  templateUrl: './yaml-sample-report.component.html',
  styleUrls: ['./yaml-sample-report.component.css'],
  imports: [
    NgIf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YamlSampleReportComponent implements OnInit {

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
