import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.scss']
})
export class PostsGridComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef) { }

  ngOnInit() {
  }
  pageChange(pageNumber) {

  };

  navigateToCreateNewPost() {
    this.router.navigate(['profile/en/admin/posts-action/new']);
  };
}
