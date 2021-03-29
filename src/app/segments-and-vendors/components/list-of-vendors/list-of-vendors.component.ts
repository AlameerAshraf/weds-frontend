import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-vendors',
  templateUrl: './list-of-vendors.component.html',
  styleUrls: ['./list-of-vendors.component.scss']
})
export class ListOfVendorsComponent implements OnInit {
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
