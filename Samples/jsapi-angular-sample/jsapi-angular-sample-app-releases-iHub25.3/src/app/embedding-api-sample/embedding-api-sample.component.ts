import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-embedding-api-sample',
  templateUrl: './embedding-api-sample.component.html',
  styleUrls: ['./embedding-api-sample.component.css'],
  imports: [
    NgIf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
