import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/dashboard/rundashboard.js'
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-plain-javascript-sample-dashboard',
    templateUrl: './plain-javascript-sample-dashboard.component.html',
    styleUrls: ['./plain-javascript-sample-dashboard.component.css']
})
export class PlainJavascriptSampleDashboardComponent implements OnInit {

    constructor(public oidcSecurityService: OidcSecurityService) {
    }

    ngOnInit() {
        const bireprotingJSUrl = environment.iportalUrl;
        this.oidcSecurityService
            .checkAuth()
            .subscribe(({isAuthenticated, accessToken}) => {
                if (isAuthenticated) {
                    MBIR.initDashboard(accessToken, bireprotingJSUrl, environment.defaultDashboardPath);
                }
            });
    }
}
