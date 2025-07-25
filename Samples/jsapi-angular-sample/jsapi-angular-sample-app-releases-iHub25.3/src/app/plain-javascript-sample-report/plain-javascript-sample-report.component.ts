import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import * as MBIR from '../../assets/report/runreport.js'
import {environment} from '../../environments/environment';


@Component({
    selector: 'app-plain-javascript-sample-report',
    templateUrl: './plain-javascript-sample-report.component.html',
    styleUrls: ['./plain-javascript-sample-report.component.css']
})
export class PlainJavascriptSampleReportComponent implements OnInit {

    constructor(public oidcSecurityService: OidcSecurityService) {
    }

    ngOnInit() {
        const {tokenAuthority} = environment;

        const bireportingjs_ServiceUrl = `${tokenAuthority}/bireportingjs/iportal`;

        this.oidcSecurityService
            .checkAuth()
            .subscribe(({isAuthenticated, accessToken}) => {
                if (isAuthenticated) {
                    MBIR.initReport(accessToken, bireportingjs_ServiceUrl, environment.defaultReportPath);
                }
            });
    }
}
