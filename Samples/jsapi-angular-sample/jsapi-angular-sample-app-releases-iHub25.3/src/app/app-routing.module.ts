import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTilesComponent } from './home-tiles/home-tiles.component';
import { SessionMissingComponent } from './session-missing/session-missing.component';
import { EmbeddingApiSampleComponent } from './embedding-api-sample/embedding-api-sample.component';
import { AuthorizationGuard } from './auth.guard';
import { DashboardEmbeddingSampleComponent } from './dashboard-embedding-sample/dashboard-embedding-sample.component';
import { YamlSampleReportComponent } from './yaml-sample-report/yaml-sample-report.component';
import { PlainJavascriptSampleReportComponent } from './plain-javascript-sample-report/plain-javascript-sample-report.component';
import { YamlSampleDashboardComponent } from './yaml-sample-dashboard/yaml-sample-dashboard.component';
import { PlainJavascriptSampleDashboardComponent } from './plain-javascript-sample-dashboard/plain-javascript-sample-dashboard.component';
import { CrosstabDataAnalyzerComponent } from './crosstab-data-analyzer/crosstab-data-analyzer.component';
import { DataProvisioningComponent } from './data-provisioning/data-provisioning.component';
import { ReportStudioComponent } from './report-studio/report-studio.component';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';




const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeTilesComponent,canActivate: [AuthorizationGuard]},
  { path: "report", component: EmbeddingApiSampleComponent,canActivate: [AuthorizationGuard] },
  { path: "yamlreport", component: YamlSampleReportComponent,canActivate: [AuthorizationGuard] },
  { path: "plainJSreport", component: PlainJavascriptSampleReportComponent,canActivate: [AuthorizationGuard] },
  { path: "dashboard", component: DashboardEmbeddingSampleComponent,canActivate: [AuthorizationGuard] },
  { path: "yamldashboard", component: YamlSampleDashboardComponent,canActivate: [AuthorizationGuard]},
  { path: "plainJSdashboard", component: PlainJavascriptSampleDashboardComponent,canActivate: [AuthorizationGuard] },
  { path: "xtab", component: CrosstabDataAnalyzerComponent,canActivate: [AuthorizationGuard] },
  { path: "dataprovisioning", component: DataProvisioningComponent,canActivate: [AuthorizationGuard] },
  { path: "reportstudio", component: ReportStudioComponent,canActivate: [AuthorizationGuard] },
  { path: "dashboarddesigner", component: DashboardDesignerComponent,canActivate: [AuthorizationGuard] },
  { path: "unauthorized", component: SessionMissingComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
