import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,) { }

  ngOnInit() {
  }

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
