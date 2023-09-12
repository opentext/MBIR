# Getting Started
### You need following information from your tenant admin to proceed
* developer cloud API BaseUrl - e.g. https://dev.ca.api.opentext.com
* tenant ID - a UUID that represents the tenant
* subscription name - MBIR application subscription name
* client ID - confidential service client ID
* client secret - confidential service client secret

Once you have the above information, please update the corresponding fields in `src/main/resources/application.properties` file.

Please refer to [Developer Registration flow](https://developer.opentext.com/imservices/developertools/developeradmin/documentation/imauthentication/1) page for obtaining the above information.

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

### This sample app has 2 main pages:
* `/setting`: This is the administration interface where the sysadmin can look up current system configuration and change a couple application settings. Refer to `src/main/resources/application.properties` for more information.
* `/mbir`: This page is the main interface of the application. Users with access to the aforementioned application subscription should be able to log in using their username/password. Please contact your OCP tenant or subscription admin for access, if you don't have one already.

### Types of users
* `Built-in admin user`: You can find the user credentials from `src/main/resources/application.properties` and you can change it too if you prefer. This user has access to `/setting` page.
* `MBIR user`: This type of user is managed and created on OCP admin center. Your tenant admin should be able to give/create you access to the Magellan BI & Reporting (MBIR) System subscription that is configured to this application (the `subscription name` field in the first section).

### Running the example pages
#### Reports
* `Report #1`: This tab runs `src/main/resources/templates/report1.html`. To run this example, you need to make sure that this report is present at this path: `/Resources/UserData/charts2_demo.rptdesign` on MBIR. Alternatively, you can run example `Report #3` first which will create a report at that path.
* `Report #2`: This tab runs `src/main/resources/templates/report2.html`. To run this example, you need to make sure that this report is present at this path: `/Resources/UserData/charts2_demo.rptdesign` on MBIR. Alternatively, you can run example `Report #3` first which will create a report at that path.
* `Report #3`: This tab runs `src/main/resources/templates/report3.html`. To run this example, you need to make sure that this data file `/Resources/UserData/Classic Models.data` is present on `MBIR`, if not you can upload it yourself. You can find the `Classic Models.data` file within the source code `src/main/resources/data/Classic Models.data`, make sure to upload to this exact path `/Resources/UserData/` on MBIR. This example creates a report based on the yaml specification in `src/main/resources/yaml/report.yaml` within this application.

#### Dashboards
* `Dashboard #1`: This tab runs `src/main/resources/templates/dashboard1.html`  To run this example, you need to make sure that this dashboard is present at this path: `/Resources/UserData/Dashboard/SampleDashboard.dashboard` on MBIR. Alternatively, you can run example `Dashboard #3` first which will create a dashboard at that path.                                                                                                                                                                                                                                                                                                                                                                                                                                                
* `Dashboard #2`: This tab runs `src/main/resources/templates/dashboard2.html`  To run this example, you need to make sure that this dashboard is present at this path: `/Resources/UserData/Dashboard/SampleDashboard.dashboard` on MBIR. Alternatively, you can run example `Dashboard #3` first which will create a dashboard at that path.                                                                                                                                                                                                                                                                                                                                                                                                                                                
* `Dashboard #3`: This tab runs `src/main/resources/templates/dashboard3.html`  To run this example, you need to make sure that this data file `/Resources/UserData/Classic Models.data` is present on `MBIR`, if not you can upload it yourself. You can find the `Classic Models.data` file within the source code path: `src/main/resources/data/Classic Models.data`, make sure to upload to this exact path `/Resources/UserData/` on MBIR. This example creates a dashboard based on the yaml specification in `src/main/resources/yaml/dashboard.yaml` within this application.

#### Studio
* `Launch Studio`: This tab runs `src/main/resources/templates/studio.html`. It launches an instance of the MBIR report studio where you can create and edit reports.
#### Dashboard Designer
* `Launch Dashboard Designer`: This tab runs `src/main/resources/templates/dashboard-designer.html`. It launches an instance of the MBIR dashboard designer where you can create and edit dashboards. This example launches in edit mode opening `/Resources/UserData/Dashboard/SampleDashboard.dashboard`, so you need to have `/Resources/UserData/Dashboard/SampleDashboard.dashboard` created on MBIR before running this example.
#### Data Provisioning
* `Launch Data Preparation`: This tab runs `src/main/resources/templates/dataprep.html`. It launches an instance of data provisioning tool where you can design and prepare data files for reports and dashboards.
