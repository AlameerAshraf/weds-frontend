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
            path: 'my-info',
            component: COMPONENTS.ProfileDetailsComponent
          },
          {
            path : 'wedding-info',
            component: COMPONENTS.WeddingDetailsComponent
          },
          {
            path : 'my-taste',
            component: COMPONENTS.BookmarksLovedComponent
          },
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
            path : 'wedding-website',
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
            path: 'users-list',
            component: COMPONENTS.UsersGridComponent
          },
          {
            path: 'users-action/:actionType',
            component : COMPONENTS.UsersFormComponent
          },
          {
            path: 'wedding-websites',
            component: COMPONENTS.WeddingWebsitesGridComponent
          },
          {
            path: 'themes-defaults',
            component: COMPONENTS.ThemesGridComponent
          },
          {
            path: 'themes-action/:actionType',
            component : COMPONENTS.ThemesFormComponent
          },
          {
            path: 'areas-defaults',
            component: COMPONENTS.AreasGridComponent
          },
          {
            path: 'areas-action/:actionType',
            component : COMPONENTS.AreasFormComponent
          },
          {
            path: 'categories-defaults',
            component: COMPONENTS.CategoriesGridComponent
          },
          {
            path: 'categories-action/:actionType',
            component : COMPONENTS.CategoriesFormComponent
          },
          {
            path: 'offers-defaults',
            component: COMPONENTS.OffersGridComponent
          },
          {
            path: 'offers-action/:actionType',
            component : COMPONENTS.OffersFormComponent
          },
          {
            path: 'tags-defaults',
            component: COMPONENTS.TagsGridComponent
          },
          {
            path: 'tags-action/:actionType',
            component : COMPONENTS.TagsFormComponent
          },
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
