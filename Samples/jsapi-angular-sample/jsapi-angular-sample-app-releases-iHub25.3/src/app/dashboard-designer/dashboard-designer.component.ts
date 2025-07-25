import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/dashboard-designer/rundashboarddesigner.js';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-dashboard-designer',
  templateUrl: './dashboard-designer.component.html',
  styleUrls: ['./dashboard-designer.component.css']
})
export class DashboardDesignerComponent implements OnInit {

    constructor(public oidcSecurityService: OidcSecurityService) {}
        public mbir = MBIR;

        ngOnInit() {
          this.oidcSecurityService
            .checkAuth()
            .subscribe(({ isAuthenticated,accessToken }) => {
              if(isAuthenticated) {
                  MBIR.loadDesigner(accessToken, environment.defaultDashboardPath, environment.iportalUrl);
              }
            });
        }


}
