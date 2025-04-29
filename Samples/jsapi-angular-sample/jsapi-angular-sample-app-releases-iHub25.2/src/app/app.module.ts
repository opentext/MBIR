import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth-config.module';
import { SessionMissingComponent } from './session-missing/session-missing.component';
import { HomeTilesComponent } from './home-tiles/home-tiles.component';
import { EmbeddingApiSampleComponent } from './embedding-api-sample/embedding-api-sample.component';
import { DashboardEmbeddingSampleComponent } from './dashboard-embedding-sample/dashboard-embedding-sample.component';
import { AngularSplitModule } from 'angular-split';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YamlSampleReportComponent } from './yaml-sample-report/yaml-sample-report.component';
import { PlainJavascriptSampleReportComponent } from './plain-javascript-sample-report/plain-javascript-sample-report.component';
import { YamlSampleDashboardComponent } from './yaml-sample-dashboard/yaml-sample-dashboard.component';
import { PlainJavascriptSampleDashboardComponent } from './plain-javascript-sample-dashboard/plain-javascript-sample-dashboard.component';
import { CrosstabDataAnalyzerComponent } from './crosstab-data-analyzer/crosstab-data-analyzer.component';
import { DataProvisioningComponent } from './data-provisioning/data-provisioning.component';
import { ReportStudioComponent } from './report-studio/report-studio.component';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';



@NgModule({
  declarations: [AppComponent, SessionMissingComponent, HomeTilesComponent, EmbeddingApiSampleComponent, DashboardEmbeddingSampleComponent, YamlSampleReportComponent, PlainJavascriptSampleReportComponent, YamlSampleDashboardComponent, PlainJavascriptSampleDashboardComponent, CrosstabDataAnalyzerComponent, DataProvisioningComponent, ReportStudioComponent, DashboardDesignerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthConfigModule,
    AngularSplitModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
