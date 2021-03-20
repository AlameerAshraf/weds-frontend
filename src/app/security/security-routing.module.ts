import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as securityComponents from './components';

const routes: Routes = [
  {
    path: 'register',
    component: securityComponents.RegisterComponent
  },
  {
    path: 'login',
    component: securityComponents.LoginComponent
  },
  {
    path: 'reset-password/:token',
    component: securityComponents.ResetPasswordComponent
  },
  {
    path: 'reset-password',
    component: securityComponents.ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
