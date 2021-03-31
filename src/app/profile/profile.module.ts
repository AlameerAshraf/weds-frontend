import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import * as COMPONENTS from './components';

@NgModule({
  declarations: [
    COMPONENTS.ProfileMainLayoutComponent,
    COMPONENTS.OverviewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }