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
            path: 'chat',
            component: COMPONENTS.UserChatComponent
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
            path: 'event-details/:eventId',
            component: COMPONENTS.EventDetailsComponent
          },
          {
            path: 'create-event',
            component: COMPONENTS.CreateEventComponent
          },
          {
            path: 'invite/:eventId',
            component: COMPONENTS.InviteFriendsComponent
          },
          {
            path : 'wedding-website',
            component: COMPONENTS.WeddingWebsiteComponent
          },
          {
            path : 'wedding-website-status',
            component: COMPONENTS.SiteStatusComponent
          }
        ]
      },
      {
        path: 'admin',
        children : [
          {
            path: 'profile-details',
            component: COMPONENTS.AdminProfileDetailsComponent
          },
          {
            path: 'website-admin',
            component: COMPONENTS.WebSiteAdminViewComponent
          },
          {
            path: 'vendors-admin',
            component: COMPONENTS.VendorAdminViewComponent
          },
          {
            path: 'users-admin',
            component: COMPONENTS.UserAdminViewComponent
          },
          {
            path: 'overview',
            component: COMPONENTS.AdminOverviewComponent
          },
          {
            path: 'messages',
            component: COMPONENTS.AdminMessagesComponent
          },
          {
            path: 'chat',
            component: COMPONENTS.ChatComponent
          },
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
          {
            path: 'events-defaults',
            component: COMPONENTS.EventsGridComponent
          },
          {
            path: 'events-action/:actionType',
            component : COMPONENTS.EventsFormComponent
          },
          {
            path: 'posts',
            component: COMPONENTS.PostsGridComponent
          },
          {
            path: 'posts-action/:actionType',
            component : COMPONENTS.PostsFormComponent
          },

          {
            path: 'vendors-list',
            component: COMPONENTS.VendorsGridComponent
          },
          {
            path: 'vendors-action/:actionType',
            component : COMPONENTS.VendorsFormComponent
          },

          {
            path: 'services-defaults',
            component: COMPONENTS.ServicesGridComponent
          },
          {
            path: 'services-action/:actionType',
            component : COMPONENTS.ServicesFormComponent
          },
          {
            path: 'services-ring-action/:actionType',
            component : COMPONENTS.ServicesRingFormComponent
          },
          {
            path: 'services-dress-action/:actionType',
            component : COMPONENTS.ServicesDressFormComponent
          },
          {
            path: 'photos-defaults',
            component: COMPONENTS.PhotosGridComponent
          },
          {
            path: 'photos-action/:actionType',
            component : COMPONENTS.PhotosFormComponent
          },
        ]
      },
      {
        path: 'vendor',
        children: [
          {
            path: 'my-info',
            component: COMPONENTS.VendorProfileDetailsComponent
          },
          {
            path : 'my-services',
            component: COMPONENTS.VendorServicesComponent
          },
          {
            path: 'overview',
            component: COMPONENTS.VendorOverviewComponent
          },
          {
            path: 'messages',
            component: COMPONENTS.VendorMessagesComponent
          },
          {
            path: 'chat',
            component: COMPONENTS.VendorChatComponent
          },
          {
            path: 'services-action/:actionType',
            component : COMPONENTS.VendorServicesFormComponent
          },
          {
            path: 'vendor-services-ring-action/:actionType',
            component : COMPONENTS.VendorServicesRingFormComponent
          },
          {
            path: 'vendor-services-dress-action/:actionType',
            component : COMPONENTS.VendorServicesDressFormComponent
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
