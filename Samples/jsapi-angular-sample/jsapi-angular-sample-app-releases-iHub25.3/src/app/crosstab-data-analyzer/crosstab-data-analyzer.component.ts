import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/crosstab/runcrosstab.js'
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-crosstab-data-analyzer',
  templateUrl: './crosstab-data-analyzer.component.html',
  styleUrls: ['./crosstab-data-analyzer.component.css']
})
export class CrosstabDataAnalyzerComponent implements OnInit{
    constructor(public oidcSecurityService: OidcSecurityService) {}

    ngOnInit() {
        this.oidcSecurityService
            .checkAuth()
            .subscribe(({ isAuthenticated,accessToken }) => {
                if(isAuthenticated) {
                    MBIR.initCrossTab(accessToken, environment.iportalUrl, environment.defaultDatamartPath);
                }
            });
    }
}
