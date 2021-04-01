import { THEME_MODULE } from './../security/security.imports';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import * as COMPONENTS from './components';


@NgModule({
  declarations: [
    COMPONENTS.BlogsComponent,
    COMPONENTS.SingleBlogComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    THEME_MODULE
  ]
})
export class BlogsModule { }
