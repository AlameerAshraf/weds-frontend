import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as appComponents from './app-components';

const routes: Routes = [
  {
    path: ':lang',
    component : appComponents.AppComponent,
    children: [
      {
        path: 'home',
        component: appComponents.HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
