import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpService, localStorageService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule,
  ],
  providers: [
    localStorageService,
    httpService,
  ]
})
export class CoreModule { }
