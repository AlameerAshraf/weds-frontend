import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';

import { COMPONENTS, THEME_MODULE } from './security.imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    COMPONENTS.LoginComponent,
    COMPONENTS.RegisterComponent,
    COMPONENTS.ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
    THEME_MODULE
  ]
})
export class SecurityModule { }
