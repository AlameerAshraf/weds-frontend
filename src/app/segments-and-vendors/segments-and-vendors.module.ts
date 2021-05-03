import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsAndVendorsRoutingModule } from './segments-and-vendors-routing.module';

import * as COMPONENTS from './components';


import { NGX_SPINNER , THEME_MODULE} from './segments-and-vendors.imports';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    COMPONENTS.VendorComponent,
    COMPONENTS.SegmentComponent,
    COMPONENTS.SearchResultsComponent,
    COMPONENTS.ListOfCategoriesComponent,
    COMPONENTS.ListOfVendorsComponent,
    COMPONENTS.DressesComponent,
    COMPONENTS.RingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SegmentsAndVendorsRoutingModule,
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
export class SegmentsAndVendorsModule { }
