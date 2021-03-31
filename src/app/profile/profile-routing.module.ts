import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './components';

const routes: Routes = [
  {
    path: '',
    component: COMPONENTS.ProfileMainLayoutComponent,
    children: [
      {
        path: 'user',
        children: [
          {
            path: 'overview',
            component: COMPONENTS.OverviewComponent
          },
          {
            path: 'messages',
            component: COMPONENTS.MessagesComponent
          },
          {
            path: 'checklist',
            component: COMPONENTS.ChecklistComponent
          },
          {
            path: 'registery',
            component: COMPONENTS.RegistrylistComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
