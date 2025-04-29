import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-embedding-api-sample',
  templateUrl: './embedding-api-sample.component.html',
  styleUrls: ['./embedding-api-sample.component.css']
})
export class EmbeddingApiSampleComponent implements OnInit {

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
