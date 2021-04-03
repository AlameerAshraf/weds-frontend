import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-grid',
  templateUrl: './offers-grid.component.html',
  styleUrls: ['./offers-grid.component.scss']
})
export class OffersGridComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef,) { }

  ngOnInit() {
    this.loadScripts();
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewOffer(){
    this.router.navigate(['profile/en/admin/offers-action/new']);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
