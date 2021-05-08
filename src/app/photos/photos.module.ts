import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import * as COMPONENTS from './components';
import { THEME_MODULE } from '../app.imports';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [
    COMPONENTS.AllPhotosComponent,
    COMPONENTS.SinglePhotoComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    THEME_MODULE,
    NgxSpinnerModule
  ],
  providers:[
    NgxSpinnerService
  ]
})
export class PhotosModule { }
