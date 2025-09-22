import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/studio/runstudio.js';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-report-studio',
  templateUrl: './report-studio.component.html',
  styleUrls: ['./report-studio.component.css']
})
export class ReportStudioComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}

      ngOnInit() {
        this.oidcSecurityService
          .checkAuth()
          .subscribe(({ isAuthenticated,accessToken }) => {
            if(isAuthenticated) {
                MBIR.loadStudio(accessToken, environment.iportalUrl);
            }
          });
      }
}
