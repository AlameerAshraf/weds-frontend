import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeddingSitesRoutingModule } from './wedding-sites-routing.module';

import * as COMPONENTS from './components';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    COMPONENTS.SaveTheDayTemplateComponent,
    COMPONENTS.VioletFlowerComponent,
    COMPONENTS.SpringGardenComponent
  ],
  imports: [
    CommonModule,
    WeddingSitesRoutingModule,
    NgxSpinnerModule,
    NgxDropzoneModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnZPhwhppJByAoyUEzJtF31F0TalEoiYA',
      libraries: ['places']
    }),
  ],
  providers: [
    NgxSpinnerService,
    ToastrService
  ]
})
export class WeddingSitesModule { }
