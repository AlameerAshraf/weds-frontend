import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as themeComponents from './components';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    themeComponents.HeaderComponent,
    themeComponents.FooterComponent,
    themeComponents.PagingComponent,
  ],
  exports: [
    themeComponents.HeaderComponent,
    themeComponents.FooterComponent,
    themeComponents.PagingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ThemeModule { }
