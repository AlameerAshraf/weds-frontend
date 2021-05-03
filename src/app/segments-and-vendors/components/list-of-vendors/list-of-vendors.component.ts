import { ActivatedRoute, Router } from '@angular/router';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { constants, localStorageService, responseModel, vendor, urls, httpService } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-of-vendors',
  templateUrl: './list-of-vendors.component.html',
  styleUrls: ['./list-of-vendors.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfVendorsComponent implements OnInit {
  isSearchExpanded = false;
  isAuthed: boolean;
  vendorList: vendor[];
  lang: any;
  categoryId: any
  categoryName: any;

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 9;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  constructor(@Inject(DOCUMENT) private document: any, private activatedRoute: ActivatedRoute, private ngxSpinner: NgxSpinnerService, private http: httpService,
    private elementRef: ElementRef, private router: Router, private localStorage: localStorageService) {
    this.activatedRoute.params.subscribe((params) => {
      debugger;
      this.categoryName = params['categorName'];
      this.categoryId = params['categorId'];
      this.categoryName = this.categoryName.toUpperCase();

    })
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.loadScripts();
    this.loadResources();
    this.getAllVendors();
  }

  checkLoginStatus() {
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if (isLogined != undefined || isLogined != '') {
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

  navigateToVendor(vendorId) {
    this.router.navigate([`segment/${this.lang}/vendor/${vendorId}`]);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/sideBarSlider.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  async loadResources() {
    let lang = window.location.href.toString().toLowerCase().indexOf("ar") > -1 ? "ar" : "en";
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang; this.lang = resourceLang;
  }
  getAllVendors() {
    this.ngxSpinner.show()
    let getVendors = `${urls.GET_VENDOR_BY_CATEGORY}/${constants.APP_IDENTITY_FOR_USERS}/${this.categoryId}`
    console.log({ getVendors })
    this.http.Get(getVendors, {}).subscribe((response: responseModel) => {
      console.log(response)
      if (!response.error) {
        this.ngxSpinner.hide();
        this.vendorList = response.data as vendor[];
        console.log(this.vendorList)
        this.collectionSize = this.vendorList.length;
        this.pageChange(1);
      } else {
        this.ngxSpinner.hide()
      }
    })
  };
}
