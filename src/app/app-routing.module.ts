import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as appComponents from './app-components';

const routes: Routes = [
  {
    path: ':lang',
    component: appComponents.AppComponent,
    children: [
      {
        path: 'home',
        component: appComponents.AnonymousHomeComponent
      },
      {
        path: 'home/app',
        component: appComponents.HomeComponent
      }
    ]
  },
  {
    path: 'security/:lang',
    loadChildren: () => import('./security/security.module')
      .then(m => m.SecurityModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
