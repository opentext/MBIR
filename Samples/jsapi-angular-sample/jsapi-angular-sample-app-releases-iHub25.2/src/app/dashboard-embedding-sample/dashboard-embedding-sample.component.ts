import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-dashboard-embedding-sample',
  templateUrl: './dashboard-embedding-sample.component.html',
  styleUrls: ['./dashboard-embedding-sample.component.css']
})
export class DashboardEmbeddingSampleComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService ) {}

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
