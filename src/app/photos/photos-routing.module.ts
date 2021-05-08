import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './components';

const routes: Routes = [
  {
    path: 'all',
    component: COMPONENTS.AllPhotosComponent
  },
  {
    path: 'photo/:photoId',
    component: COMPONENTS.SinglePhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
