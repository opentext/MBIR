# dbi-angular-pkce
This README provides guidance on configuring and running the application. The following information must be updated in the `environment.ts` file to ensure correct functionality.

## Prerequisites
1. Node.js with npm
   https://nodejs.org/en/download

2. Install package dependencies to compile the app

    ```shell 
    npm install
    ```
3. Service client registered with the Apps Redirect URL (http://localhost:4200 by default)  in admin center tenant configuration

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Environment Configuration
### You need following information from your tenant admin to proceed
* devx cloud API BaseUrl - e.g. https://ca.api.opentext.com
* tenant ID - a UUID that represents the tenant
* client ID - public service client ID

Please contact your tenant admin to obtain the above credentials. They can be obtained from developer admin center which is documented [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/applicationadministration/2). Basically your tenant admin needs to do the following:
* create an extension app, following this [link](https://developer.opentext.com/imservices/developertools/developeradmin/tutorials/createyourfirstapplication/2)
* Obtain the service client id, more info [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/tenantidandpassword/2)
* Add your app's URL as redirect URLs to the service client, more info [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/tenantidandpassword/2)

In addition, for more information on Cloud Platform authentication, refer to this [link](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/authentication/1)


### Update `environment.ts`

In your `environment.ts` file, you should update the following values:

1. **`tokenAuthority` (DevX Cloud API BaseUrl):** This should be set to the base URL of the DevX Cloud API, for example:
    ```typescript
    export const environment = {
        // ...
        tokenAuthority: 'https://ca.api.opentext.com',
        // ...
    };
    ```

2. **`tenantId`:** Replace this with a UUID that represents the specific tenant:
    ```typescript
    export const environment = {
        // ...
        tenant_id: 'your-tenant-uuid',
        // ...
    };
    ```

3. **`clientId` (Public Service Client ID):** Insert the public service client ID:
    ```typescript
    export const environment = {
        // ...
        clientId: 'your-client-id',
        // ...
    };
    ```

4. **`redirectUrl`:** The URL to which the token authority should redirect after login and logout. Leave this as the app's base URL (http://localhost:4200) by default. However, make sure to specify the actual redirect URL under the public service client configuration for the MBIR tenant within the admin center.

Update the `redirectUrl` in your `environment.ts` :

     ```typescript
     export const environment = {
         // ...
         redirectUrl: 'http://localhost:4200',
         // ...
     };
     ```
### Update `src/index.html`
Please add or update the `jsapi url` in a script tag. e.g. `<script type="text/javascript" src="https://ca.api.opentext.com/bireportingjs/iportal/jsapi"></script>`

### Update `src/app/embedding-api-sample/embedding-api-sample.component.html`
**`url`:** please update the bireportingjs endpoint here. e.g. `https://ca.api.opentext.com/bireportingjs/iportal`

### Update `src/app/dashboard-embedding-sample/dashboard-embedding-sample.component.html`
**`url`:** please update the bireportingjs endpoint here. e.g. `https://ca.api.opentext.com/bireportingjs/iportal`

These configuration changes are crucial for the application to function correctly with the DevX Cloud API and to ensure the logout redirection works as expected.

## Running the Application 

Once you have updated your `environment.ts` file as specified and made the necessary SSL and hostname configurations, you can run the application with the following command:

```shell
ng serve
```
## About Application 

This application uses PKCE-enhanced Authorization code Login flow which is known to prevent authorization code interception attacks. For more info check this link: https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce

## Running the example pages

### Report Sample: 

This tab runs src/app/embedding-api-sample/embedding-api-sample.component.html. To run this example, you need to make sure that this report is present at this path: /Resources/UserData/Chart.rptdesign on MBIR.

### Dashboard Sample: 

This tab runs src/app/dashboard-embedding-sample/dashboard-embedding-sample.component.html. To run this example, you need to make sure that this dashboard is present at this path: /Resources/UserData/Dashboard.dashboard on MBIR.
