import { ListOfCategoriesComponent } from './components/list-of-categories/list-of-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsAndVendorsRoutingModule } from './segments-and-vendors-routing.module';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NGX_SPINNER , COMPONENTS , THEME_MODULE} from './segments-and-vendors.imports';

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
