import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as appComponents from './app-components';
import { CanRouteActivate } from './core';

const routes: Routes = [
  {
    path: ':lang',
    component: appComponents.AppComponent,
    children: [
      {
        path: 'home/anonymous',
        component: appComponents.AnonymousHomeComponent,
      },
      {
        path: 'home',
        component: appComponents.AuthorizedHomeComponent,
        canActivate: [CanRouteActivate]
      }
    ]
  },
  {
    path: '',
    component: appComponents.AppComponent,
    children: [
      {
        path: '',
        component: appComponents.AnonymousHomeComponent
      }
    ]
  },
  {
    path: 'security/:lang',
    loadChildren: () => import('./security/security.module')
      .then(m => m.SecurityModule),
  },
  {
    path: 'segment/:lang',
    loadChildren: () => import('./segments-and-vendors/segments-and-vendors.module')
      .then(m => m.SegmentsAndVendorsModule)
  },
  {
    path: 'profile/:lang',
    loadChildren: () => import('./profile/profile.module')
      .then(m => m.ProfileModule)
  },
  {
    path: 'blogs/:lang',
    loadChildren: () => import('./blogs/blogs.module')
      .then(m => m.BlogsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
