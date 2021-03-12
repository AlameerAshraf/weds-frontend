import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as themeComponents from './components';
@NgModule({
  declarations: [
    themeComponents.HeaderComponent, 
    themeComponents.FooterComponent
  ],
  exports: [
    themeComponents.HeaderComponent, 
    themeComponents.FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThemeModule { }
