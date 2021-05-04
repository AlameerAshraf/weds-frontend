import { THEME_MODULE } from './../security/security.imports';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import * as COMPONENTS from './components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    COMPONENTS.BlogsComponent,
    COMPONENTS.SingleBlogComponent,
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    THEME_MODULE,
    InfiniteScrollModule
  ],
  providers:[
    NgxSpinnerService
  ]
})
export class BlogsModule { }
