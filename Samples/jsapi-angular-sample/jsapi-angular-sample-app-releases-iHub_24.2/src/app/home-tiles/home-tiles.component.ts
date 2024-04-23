import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home-tiles',
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.css']
})
export class HomeTilesComponent implements OnInit{

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router  ) {   }

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

  onSelectReport() {
    this.router.navigateByUrl('/report');
  }

  onSelectDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  protected readonly environment = environment;
}
