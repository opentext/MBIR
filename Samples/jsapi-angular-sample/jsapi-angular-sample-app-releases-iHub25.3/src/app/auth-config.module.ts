import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: environment.tokenAuthority,
        authWellknownEndpoints: {
          authorizationEndpoint: environment.tokenAuthority+'/tenants/'+environment.tenant_id+ '/oauth2/auth',
          tokenEndpoint: environment.tokenAuthority+'/tenants/'+environment.tenant_id+ '/oauth2/token',
          jwksUri: environment.tokenAuthority+'/tenants/'+environment.tenant_id+ '/oauth2/jwks',
          issuer: environment.tokenAuthority+'/tenants/'+environment.tenant_id,
          endSessionEndpoint: environment.tokenAuthority+'/tenants/'+environment.tenant_id+ '/oauth2/logout',
        },
        redirectUrl: environment.redirectUrl,
        postLogoutRedirectUri:environment.redirectUrl,
        clientId: environment.clientId,
        scope: 'openid',
        responseType: 'code',
        silentRenew: false,
        // autoUserInfo: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        issValidationOff: true,
        autoUserInfo: false,
        logLevel: environment.production ? LogLevel.None : LogLevel.Debug,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
