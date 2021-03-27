import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { COMPONENTS, THEME_MODULE } from './app.imports';
import { AppConfig, httpService, localStorageService, resources , ValidateService } from './core';


@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS.HomeComponent,
    COMPONENTS.AnonymousHomeComponent,
    COMPONENTS.AuthorizedHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    THEME_MODULE,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    localStorageService,
    httpService,
    AppConfig,
    resources,
    ValidateService,
    {
      provide: APP_INITIALIZER ,
      useFactory: (ds: AppConfig) => () => ds.load(),
      deps: [AppConfig] ,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
