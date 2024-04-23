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



@NgModule({
  declarations: [AppComponent, SessionMissingComponent, HomeTilesComponent, EmbeddingApiSampleComponent, DashboardEmbeddingSampleComponent],
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
