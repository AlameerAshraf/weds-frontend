import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './components';

const routes: Routes = [
  {
    path: 'my-wishes-list',
    component: COMPONENTS.RegistryListComponent
  },
  {
    path: 'save-the-day',
    component: COMPONENTS.SaveTheDayTemplateComponent
  },
  {
    path: 'violet-flower',
    component: COMPONENTS.VioletFlowerComponent
  },
  {
    path: 'spring-garden',
    component: COMPONENTS.SpringGardenComponent
  },
  {
    path: 'beach',
    component: COMPONENTS.BeachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeddingSitesRoutingModule { }
