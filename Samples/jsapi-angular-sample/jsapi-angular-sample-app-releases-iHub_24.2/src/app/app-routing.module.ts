import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTilesComponent } from './home-tiles/home-tiles.component';
import { SessionMissingComponent } from './session-missing/session-missing.component';
import { EmbeddingApiSampleComponent } from './embedding-api-sample/embedding-api-sample.component';
import { AuthorizationGuard } from './auth.guard';
import { DashboardEmbeddingSampleComponent } from './dashboard-embedding-sample/dashboard-embedding-sample.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeTilesComponent,canActivate: [AuthorizationGuard]},
  { path: "report", component: EmbeddingApiSampleComponent,canActivate: [AuthorizationGuard] },
  { path: "dashboard", component: DashboardEmbeddingSampleComponent,canActivate: [AuthorizationGuard] },
  { path: "unauthorized", component: SessionMissingComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
