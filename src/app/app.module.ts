import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { COMPONENTS, THEME_MODULE } from './app.imports';


@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS.HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    THEME_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
