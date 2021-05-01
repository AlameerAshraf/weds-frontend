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
  },
  {
    path: 'wedding-hall',
    component: COMPONENTS.WeddingHallComponent
  },
  {
    path: 'floral',
    component: COMPONENTS.FloralComponent
  },
  {
    path: 'read-heart',
    component: COMPONENTS.ReadHeartComponent
  },
  {
    path: 'red-flowers',
    component: COMPONENTS.RedFlowersComponent
  },
  {
    path: 'two-rings',
    component: COMPONENTS.TwoRingsComponent
  },
  {
    path: 'flowers',
    component: COMPONENTS.FlowersComponent
  },
  {
    path: 'lovebook',
    component: COMPONENTS.LovebookComponent
  },
  {
    path: 'paperpencil',
    component: COMPONENTS.PaperpencilComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeddingSitesRoutingModule { }
