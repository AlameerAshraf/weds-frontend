import { Router } from '@angular/router';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { localStorageService, transporter } from 'src/app/core';

@Component({
  selector: 'app-list-of-vendors',
  templateUrl: './list-of-vendors.component.html',
  styleUrls: ['./list-of-vendors.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfVendorsComponent implements OnInit {
  isSearchExpanded = false;
  isAuthed: boolean;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private router: Router , private localStorage: localStorageService) { }

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

  navigateToVendor(vendorId){
    this.router.navigate([`segment/en/vendor/${vendorId}`]);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/sideBarSlider.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
