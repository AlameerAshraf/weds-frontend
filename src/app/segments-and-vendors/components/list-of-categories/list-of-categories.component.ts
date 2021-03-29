import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfCategoriesComponent implements OnInit {
  isSearchExpanded = false;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,) { }

  ngOnInit() {
  }

  showCategories(event: any) {
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  };

  pageChange(pageNumber: number) {
    console.log(pageNumber);
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/sideBarSlider.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
