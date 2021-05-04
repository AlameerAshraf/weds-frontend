import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from "./components";

const routes: Routes = [
  {
    path: 'all/:categoryName/:categoryId',
    component: COMPONENTS.BlogsComponent
  },
  {
    path: 'blog/:name/:id',
    component: COMPONENTS.SingleBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
