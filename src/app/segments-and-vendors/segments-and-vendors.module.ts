import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsAndVendorsRoutingModule } from './segments-and-vendors-routing.module';

import * as COMPONENTS from './components';


import { NGX_SPINNER , THEME_MODULE} from './segments-and-vendors.imports';

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
    THEME_MODULE
  ]
})
export class SegmentsAndVendorsModule { }
