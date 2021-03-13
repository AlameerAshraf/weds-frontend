import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { COMPONENTS, THEME_MODULE } from './app.imports';
import { AppConfig, httpService, localStorageService } from './core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS.HomeComponent,
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    THEME_MODULE
  ],
  providers: [
    localStorageService,
    httpService,
    AppConfig,
    { 
      provide: APP_INITIALIZER , 
      useFactory: (config: AppConfig)=> () => config.load() , 
      deps: [AppConfig] , 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
