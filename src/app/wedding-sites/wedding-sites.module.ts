import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeddingSitesRoutingModule } from './wedding-sites-routing.module';

import * as COMPONENTS from './components';

@NgModule({
  declarations: [
    COMPONENTS.SaveTheDayTemplateComponent
  ],
  imports: [
    CommonModule,
    WeddingSitesRoutingModule
  ]
})
export class WeddingSitesModule { }
