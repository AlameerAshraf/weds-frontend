import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './components';

const routes: Routes = [
  {
    path: 'results',
    component: COMPONENTS.SearchComponent
  },
  {
    path: 'rings-search-results',
    component: COMPONENTS.RingsComponent
  },
  {
    path: 'dresses-search-results',
    component: COMPONENTS.DressesComponent
  },
  {
    path: 'vendors-search-results',
    component: COMPONENTS.VendorsComponent
  },
  {
    path: 'photos-search-results',
    component: COMPONENTS.PhotosComponent
  },
  {
    path: 'blogs-search-results',
    component: COMPONENTS.BlogsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
