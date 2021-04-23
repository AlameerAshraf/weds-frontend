import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsAndVendorsRoutingModule } from './segments-and-vendors-routing.module';

import * as COMPONENTS from './components';


import { NGX_SPINNER , THEME_MODULE} from './segments-and-vendors.imports';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    COMPONENTS.VendorComponent,
    COMPONENTS.SegmentComponent,
    COMPONENTS.SearchResultsComponent,
    COMPONENTS.ListOfCategoriesComponent,
    COMPONENTS.ListOfVendorsComponent
  ],
  imports: [
    CommonModule,
    SegmentsAndVendorsRoutingModule,
    THEME_MODULE,
    NgxSpinnerModule,
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
