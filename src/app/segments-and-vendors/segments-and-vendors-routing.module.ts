import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as segmentAndVendorComponents from './components';

const routes: Routes = [
  {
    path: 'all-categories/:segmentName',
    component: segmentAndVendorComponents.ListOfCategoriesComponent //List of categories in segment.
  },
  {
    path: 'all-vendors/:categorName',
    component: segmentAndVendorComponents.ListOfVendorsComponent // List of vendors in category.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentsAndVendorsRoutingModule { }
