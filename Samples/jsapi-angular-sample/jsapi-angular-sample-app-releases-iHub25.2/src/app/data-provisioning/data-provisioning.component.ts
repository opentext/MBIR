import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/data-provisioning/rundataprovisioning.js'
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-data-provisioning',
  templateUrl: './data-provisioning.component.html',
  styleUrls: ['./data-provisioning.component.css']
})
export class DataProvisioningComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}
      protected mbir = MBIR;

      ngOnInit() {
        this.oidcSecurityService
          .checkAuth()
          .subscribe(({ isAuthenticated,accessToken }) => {
              if(isAuthenticated) {
                  MBIR.initDataProvisioning(accessToken, environment.iportalUrl);
              }
          });
      }

}
