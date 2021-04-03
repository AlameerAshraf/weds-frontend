import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef) { }

  ngOnInit() {
  }

  pageChange(pageNumber) {

  };

  navigateToCreateNewCategory() {
    this.router.navigate(['profile/en/admin/categories-action/new']);
  };


  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
