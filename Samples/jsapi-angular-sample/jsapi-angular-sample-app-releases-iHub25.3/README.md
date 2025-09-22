## 25.3 Release Notes
* upgraded all NPM dependencies to latest, stable&secure versions
* updated code base as per latest angular framewrok version requirements

# JSAPI Angular Sample/Tutorial App
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
5. **`defaultReportPath`:** Path of the report to be rendered on the report related examples (first row on home page).

6. **`defaultDashboardPath`:** Path of the Dashboard to be rendered on the dashboard related examples (second row on home page).

7. **`defaultDatamartPath`:** Path of the data file to be rendered on the crosstab analyzer example

8. **`defaultReportYamlPath`:** Path of the yaml file to be used on the report yaml example

9. **`defaultDashboardYamlPath`:** Path of the yaml file to be used on the dashboard yaml example

These configuration changes are crucial for the application to function correctly with the DevX Cloud API and to ensure the logout redirection works as expected.

## Running the Application 

Once you have updated your `environment.ts` file as specified and made the necessary SSL and hostname configurations, you can run the application with the following command:

```shell
ng serve
```
## About Application 

This application uses PKCE-enhanced Authorization code Login flow which is known to prevent authorization code interception attacks. For more info check this link: https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
