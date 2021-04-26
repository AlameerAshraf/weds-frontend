import { localStorageService } from './../../../core/services/local-storage/local-storage';
import { Router } from '@angular/router';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfCategoriesComponent implements OnInit , AfterViewInit {
  isSearchExpanded = false;
  isAuthed: boolean;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private router: Router, private localStorage: localStorageService) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.loadScripts();
  }

  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };

  showCategories(event: any) {
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  };

  pageChange(pageNumber: number) {
    console.log(pageNumber);
  };

  navigateToVendorsList(categoryName){
    this.router.navigate([`segment/en/all-vendors/${categoryName}`]);
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
  }
}
