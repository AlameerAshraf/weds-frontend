import { NgxSpinnerService } from 'ngx-spinner';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';

import * as COMPONENTS from './components';
import { THEME_MODULE , NGX_SPINNER } from './security.imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';
import { AppConfig, constants } from '../core';

export function socialConfigs() {
  return {
    "autoLogin": false,
    "providers": [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(constants.GOOGLE_CLIENT_ID)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('288837749468586')
      }
    ]
  }
}

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
    NgxSpinnerService,
    SocialAuthService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: socialConfigs() as SocialAuthServiceConfig
    }
  ]
})
export class SecurityModule { }
