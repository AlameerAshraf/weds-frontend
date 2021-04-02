import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { THEME_MODULE } from './app.imports';
import * as COMPONENTS from './app-module-components';

import { AppConfig, httpService, localStorageService, resources , ValidateService } from './core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS.AnonymousHomeComponent,
    COMPONENTS.AuthorizedHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    THEME_MODULE,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [
    localStorageService,
    httpService,
    AppConfig,
    resources,
    ValidateService,
    ToastrService,
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
