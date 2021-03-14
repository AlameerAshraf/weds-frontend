import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as securityComponents from './components';

const routes: Routes = [
  {
    path: 'register',
    component: securityComponents.RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
