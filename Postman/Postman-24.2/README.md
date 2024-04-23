# Postman Collection for Magellan™ BI and Reporting – Public Cloud
## Using Postman Collections
### Environment Variables
1. api_host: Host URL (E.g., https://dev.ca.api.opentext.com)
2. tenant_id: Tenant ID
3. user_name: MBIR subscription username
4. tenant_user_password: User password
5. ext_mbir_app_confclientid: Client ID for the extended App
6. ext_mbi_confclient_secret: Client Secret for the extended App
7. locale: Locale

Contact your tenant admin to obtain the values for #1, #2, #5 and #6. Select the value for #7 and provide your subscription credentials for #3 and #4.
### Sample Requests
Refer to the 'bireporting_service_collection.postman_collection.json' to try out the sample requests.
As a prerequisite to run the Collection, execute these steps first:
1. POST /oauth2/token (Get authentication token)
2. GET /contents/folders/items (Return list of files and folders in the root folder)
3. POST /contents/files/upload (Upload a file)
   * Switch to "Body" tab of “upload” API and delete the existing "ClassicModelsPredefinedMeasures.data" file by clicking on the x.
   * Select the provided "ClassicModelsPredefinedMeasures.data" file
   * Click the Send button of above upload API

Steps 2 and 3 are required for the Headless BI APIs in the Collection
