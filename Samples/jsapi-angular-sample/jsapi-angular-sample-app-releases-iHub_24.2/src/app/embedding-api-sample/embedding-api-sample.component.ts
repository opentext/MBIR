import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-embedding-api-sample',
  templateUrl: './embedding-api-sample.component.html',
  styleUrls: ['./embedding-api-sample.component.css']
})
export class EmbeddingApiSampleComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService) {}

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
