import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as COMPONENTS from './components';
import { WeddingSitesRoutingModule } from './wedding-sites-routing.module';


@NgModule({
  declarations: [
    COMPONENTS.SaveTheDayTemplateComponent,
    COMPONENTS.VioletFlowerComponent,
    COMPONENTS.SpringGardenComponent,
    COMPONENTS.RegistryListComponent,
    COMPONENTS.BeachComponent,
    COMPONENTS.WeddingHallComponent,
    COMPONENTS.ReadHeartComponent,
    COMPONENTS.TwoRingsComponent,
    COMPONENTS.FloralComponent,
    COMPONENTS.RedFlowersComponent,
    COMPONENTS.FlowersComponent,
    COMPONENTS.LovebookComponent,
    COMPONENTS.PaperpencilComponent,
    COMPONENTS.BouquetComponent,
    COMPONENTS.ClassicComponent,
    COMPONENTS.ClassicTwoComponent,
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
