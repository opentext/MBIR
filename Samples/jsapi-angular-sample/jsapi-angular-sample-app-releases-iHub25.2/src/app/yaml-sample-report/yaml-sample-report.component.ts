import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-yaml-sample-report',
  templateUrl: './yaml-sample-report.component.html',
  styleUrls: ['./yaml-sample-report.component.css']
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
