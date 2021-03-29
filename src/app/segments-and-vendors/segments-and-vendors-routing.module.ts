import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as segmentAndVendorComponents from './components';

const routes: Routes = [
  {
    path: ':segmentName',
    component: segmentAndVendorComponents.SegmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentsAndVendorsRoutingModule { }
