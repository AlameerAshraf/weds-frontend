import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-grid',
  templateUrl: './tags-grid.component.html',
  styleUrls: ['./tags-grid.component.scss']
})
export class TagsGridComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

  ngOnInit() {
    this.loadScripts();
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewTag(){
    this.router.navigate(['profile/en/admin/tags-action/new']);
  }

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
