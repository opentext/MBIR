import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dashboard-embedding-sample',
  templateUrl: './dashboard-embedding-sample.component.html',
  styleUrls: ['./dashboard-embedding-sample.component.css']
})
export class DashboardEmbeddingSampleComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService ) {}

  public isAuthenticated:boolean;
  public authToken: any;
  public loading: boolean;

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated,accessToken }) => {
        this.isAuthenticated = isAuthenticated;
        this.authToken = accessToken;
        this.loading = false;
      });
  }
}
