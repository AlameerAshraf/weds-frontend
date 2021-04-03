import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themes-grid',
  templateUrl: './themes-grid.component.html',
  styleUrls: ['./themes-grid.component.scss']
})
export class ThemesGridComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.loadScripts();
  }

  pageChange(pageNumber) {

  };

  navigateToCreateNewTheme() {
    this.router.navigate(['profile/en/admin/themes-action/new']);
  }


  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
