import { NgxSpinnerService } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';

import * as COMPONENTS from './components';
import { THEME_MODULE , NGX_SPINNER } from './security.imports';
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
    THEME_MODULE,
    NGX_SPINNER
  ],
  providers: [
    NgxSpinnerService
  ]
})
export class SecurityModule { }
