import { localStorageService } from './../../../core/services/local-storage/local-storage';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  isSearchExpanded = false;

  latitude: number = 23.333;
  longitude: number = 45.655;
  isAuthed: boolean;


  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private localStorage: localStorageService) { }

  ngOnInit() {
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
  }

  ngAfterViewInit(): void {
    // let scripts = ['assets/scripts/custom.js'];

    // scripts.forEach(element => {
    //   const s = this.document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = element;
    //   this.elementRef.nativeElement.appendChild(s);
    // });
  };
}
