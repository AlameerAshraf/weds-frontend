import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './components';

const routes: Routes = [
  {
    path: 'save-the-day',
    component: COMPONENTS.SaveTheDayTemplateComponent
  },
  {
    path: 'violet-flower',
    component: COMPONENTS.VioletFlowerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeddingSitesRoutingModule { }
