## 25.2 Release Notes
* Upgraded springboot (3.2.3) to the latest stable version 3.3.2
* Fixed some UI defects
* Enabled retry for proxy rest client to make the app more stable
* Updated embedded studio integration code as per latest JavaScript API changes.

# Getting Started
### You need following information from your tenant admin to proceed
* devx cloud API BaseUrl - e.g. https://ca.api.opentext.com
* tenant ID - a UUID that represents the tenant
* client ID - confidential service client ID
* client secret - confidential service client secret

Please contact your tenant admin to obtain the above credentials. They can be obtained from developer admin center which is documented [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/applicationadministration/2). Basically your tenant admin needs to do the following:
* create an extension app, following this [link](https://developer.opentext.com/imservices/developertools/developeradmin/tutorials/createyourfirstapplication/2)
* Obtain the service client id/secret, more info [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/tenantidandpassword/2)
* Add your app's URL as redirect URLs to the service client, more info [here](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/tenantidandpassword/2)

In addition, for more information on Cloud Platform authentication, refer to this [link](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/authentication/1)


Once you have the above information, please update the corresponding fields in `src/main/resources/application.properties` file.

### Prerequisites for building the application
* JDK 17
* Apache Maven 3+

To build the Application run following command under source root folder:
```
mvn clean install
```
### Prerequisites for running the application
* JDK 17 

You have the following options to run the application:
* _running the executable jar_: If you have built the application, you should be able to find the executable jar under `/target` folder. You can start up the application by running the following command this command: `java -jar <path to jar file>`
* _using spring-boot maven plugin_: Open up your terminal and run this command under source root folder: `./mvnw spring-boot:run` 

Once the application is up, you should be able to access on port 9090, i.e. http://localhost:9090

# About Application
This application uses PKCE-enhanced Authorization code Login flow which is known to prevent authorization code interception attacks. For more info check this link: https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce

### Running the example pages
#### Reports
* `Report #1`: This tab runs `src/main/resources/templates/report1.html`. To run this example, you need to make sure that this report is present at this path: `/Resources/UserData/charts2_demo.rptdesign` on MBIR. Alternatively, you can run example `Report #3` first which will create a report at that path.
* `Report #2`: This tab runs `src/main/resources/templates/report2.html`. To run this example, you need to make sure that this report is present at this path: `/Resources/UserData/charts2_demo.rptdesign` on MBIR. Alternatively, you can run example `Report #3` first which will create a report at that path.
* `Report #3`: This tab runs `src/main/resources/templates/report3.html`. To run this example, you need to make sure that this data file `/Resources/UserData/Classic Models.data` is present on `MBIR`, if not you can upload it yourself. You can find the `Classic Models.data` file within the source code `src/main/resources/data/Classic Models.data`, make sure to upload to this exact path `/Resources/UserData/` on MBIR. This example creates a report based on the yaml specification in `src/main/resources/yaml/report.yaml` within this application. You can customize the report by modifying the yaml file according to our [Declarative BI documentation](https://confluence.opentext.com/display/Analytics/Declarative+BI+YAML+Specification). 
#### Dashboards
* `Dashboard #1`: This tab runs `src/main/resources/templates/dashboard1.html`  To run this example, you need to make sure that this dashboard is present at this path: `/Resources/UserData/Dashboard/SampleDashboard.dashboard` on MBIR. Alternatively, you can run example `Dashboard #3` first which will create a dashboard at that path.                                                                                                                                                                                                                                                                                                                                                                                                                                                
* `Dashboard #2`: This tab runs `src/main/resources/templates/dashboard2.html`  To run this example, you need to make sure that this dashboard is present at this path: `/Resources/UserData/Dashboard/SampleDashboard.dashboard` on MBIR. Alternatively, you can run example `Dashboard #3` first which will create a dashboard at that path.                                                                                                                                                                                                                                                                                                                                                                                                                                                
* `Dashboard #3`: This tab runs `src/main/resources/templates/dashboard3.html`  To run this example, you need to make sure that this data file `/Resources/UserData/Classic Models.data` is present on `MBIR`, if not you can upload it yourself. You can find the `Classic Models.data` file within the source code path: `src/main/resources/data/Classic Models.data`, make sure to upload to this exact path `/Resources/UserData/` on MBIR. This example creates a dashboard based on the yaml specification in `src/main/resources/yaml/dashboard.yaml` within this application. You can customize the report by modifying the yaml file according to our [Declarative BI documentation](https://confluence.opentext.com/display/Analytics/Declarative+BI+YAML+Specification).
#### Studio
* `Launch Studio`: This tab runs `src/main/resources/templates/studio.html`. It launches an instance of the MBIR report studio where you can create and edit reports.
#### Dashboard Designer
* `Launch Dashboard Designer`: This tab runs `src/main/resources/templates/dashboard-designer.html`. It launches an instance of the MBIR dashboard designer where you can create and edit dashboards. This example launches in edit mode opening `/Resources/UserData/Dashboard/SampleDashboard.dashboard`, so you need to have `/Resources/UserData/Dashboard/SampleDashboard.dashboard` created on MBIR before running this example.
#### Data Provisioning
* `Launch Data Preparation`: This tab runs `src/main/resources/templates/dataprep.html`. It launches an instance of data provisioning tool where you can design and prepare data files for reports and dashboards.
#### Crosstab Data Analyzer
* `Launch crosstab analyzer`: This tab runs `src/main/resources/templates/crosstab.html`. It launches an instance of crosstab data analyzer tool.The Interactive Crosstabs portion of the JavaScript API is a set of JavaScript classes that modify, analyze, and display data within cross tab elements. The Interactive Crosstabs JavaScript can be placed within a web page or any other location where the JavaScript API interfaces with a cross tab. You can load the following data into Interactive Crosstabs:
* `A report document that consists of a single data cube and cross tab`
* `A report document that consists of multiple data cubes and cross tabs using the cross tab element's bookmark name`
* `A data model file`
