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
          },
          {
            path: 'budgeter',
            component: COMPONENTS.BudgeterComponent
          },
          {
            path: 'events',
            component: COMPONENTS.EventsComponent
          },
          {
            path : 'wedding',
            component: COMPONENTS.WeddingWebsiteComponent
          }
        ]
      },
      {
        path: 'admin',
        children : [
          {
            path: 'checklist-defaults',
            component: COMPONENTS.ChecklistGridComponent
          },
          {
            path: 'checklist-action/:actionType',
            component : COMPONENTS.ChecklistFormComponent
          },
          {
            path: 'budgeter-defaults',
            component: COMPONENTS.BudgeterGridComponent
          },
          {
            path: 'budgeter-action/:actionType',
            component : COMPONENTS.BudgeterFormComponent
          },
          {
            path: 'users-defaults',
            component: COMPONENTS.UsersGridComponent
          },
          {
            path: 'users-action/:actionType',
            component : COMPONENTS.UsersFormComponent
          },
          {
            path: 'wedding-websites',
            component: COMPONENTS.WeddingWebsitesGridComponent
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
