import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as segmentAndVendorComponents from './components';

const routes: Routes = [
  {
    path: 'all-categories/:segmentName',
    component: segmentAndVendorComponents.ListOfCategoriesComponent //List of categories in segment.
  },
  {
    path: 'dresses',
    component: segmentAndVendorComponents.DressesComponent //List of dresses!
  },
  {
    path: 'rings',
    component: segmentAndVendorComponents.RingsComponent //List of dresses!
  },
  {
    path: 'all-vendors/:categorName/:categorId',
    component: segmentAndVendorComponents.ListOfVendorsComponent // List of vendors in category.
  },
  {
    path: 'vendor/:vendorId',
    component: segmentAndVendorComponents.VendorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentsAndVendorsRoutingModule { }
