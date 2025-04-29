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

  onSelectYamlReport() {
    this.router.navigateByUrl('/yamlreport');
  }

  onSelectPlainJSReport() {
    this.router.navigateByUrl('/plainJSreport');
  }

  onSelectPlainJSDashboard() {
    this.router.navigateByUrl('/plainJSdashboard');
  }

  onSelectDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  onSelectYamlDashboard() {
    this.router.navigateByUrl('/yamldashboard');
  }

  onSelectCrosstabAnalyzer() {
    this.router.navigateByUrl('/xtab');
  }

  onSelectDataProvisioing() {
    this.router.navigateByUrl('/dataprovisioning');
  }

  onSelectReportStudio() {
    this.router.navigateByUrl('/reportstudio');
  }

    onSelectDashboardDesigner() {
    this.router.navigateByUrl('/dashboarddesigner');
  }

  protected readonly environment = environment;
}
