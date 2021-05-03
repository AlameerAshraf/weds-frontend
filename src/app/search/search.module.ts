import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { FormsModule } from '@angular/forms';
import { THEME_MODULE } from '../app.imports';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgImageSliderModule } from 'ng-image-slider';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CommonModule,
    FormsModule,
    THEME_MODULE,
    NgxSpinnerModule,
    NgImageSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnZPhwhppJByAoyUEzJtF31F0TalEoiYA',
      libraries: ['places']
    })
  ],
  providers:[
    NgxSpinnerService
  ]
})
export class SearchModule { }
