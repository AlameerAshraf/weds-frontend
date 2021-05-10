import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, httpService,resources, LookupsService, responseModel, urls, vendor, area } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { localStorageService } from './../../../core/services/local-storage/local-storage';
declare var $: any;

@Component({
  selector: 'app-list-of-vendors',
  templateUrl: './list-of-vendors.component.html',
  styleUrls: ['./list-of-vendors.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfVendorsComponent implements OnInit {
  isSearchExpanded = false;
  isAuthed: boolean;
  vendorsList: vendor[] = [];
  categoryId: any
  categoryName: any;
  lang: any;
  promotedVendorList: vendor[] = [];
  that = this;
  labels: any = {};
  allAreas: area[] = [];

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 9;
  limit: number;
  skip: number;
  showPaging = true;

    // Search vars!
    searchableList: vendor[] = [];
    selectedSearchArea: string = "";
    searchKey = undefined;

     // End search vars!

  

  constructor(@Inject(DOCUMENT) private document: any, private activatedRoute: ActivatedRoute, private ngxSpinner: NgxSpinnerService, private http: httpService,
    private elementRef: ElementRef, private router: Router, private localStorage: localStorageService, private resources: resources,private lookupsService: LookupsService) {
    this.activatedRoute.params.subscribe((params) => {

      this.categoryName = params['categorName'];
      this.categoryId = params['categorId'];
      this.categoryName = this.categoryName.toUpperCase();

    })
  }

  async ngOnInit() {
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();
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

  async getLookups() {
    this.allAreas = ((await this.lookupsService.getAreas()) as responseModel).data;
  };

  navigateToVendor(vendorId) {
    this.router.navigate([`segment/${this.lang}/vendor/${vendorId}`]);
  };

  async ngAfterViewInit() {
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();
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
  getAllVendors() {
    this.ngxSpinner.show()
    let vendorsURL = `${urls.GET_VENDOR_BY_CATEGORY}/${constants.APP_IDENTITY_FOR_USERS}/${this.categoryId}`
    this.http.Get(vendorsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.vendorsList = this.searchableList = response.data as vendor[];
        this.searchableList.forEach((vendor : any ) =>{
          vendor.totalRank = this.viewAggregatedVendorRate(vendor.ranks)
        })

        this.promotedVendorList = this.vendorsList.filter((vendor: any) => {
          return vendor.isPromoted == true;
        });
        this.collectionSize = this.vendorsList.length;
        this.pageChange(1);
      } else {
        this.ngxSpinner.hide()
      }
    })
  };

  viewAggregatedVendorRate(vendorRates: { user?: string, criteria?: string, value?: number, userEmail?: string }[]){
    let counter = 0;
    let aggregatedTotalRank = 0;

    vendorRates.forEach((rank) => {
      counter = counter + rank.value;
    });

    aggregatedTotalRank =  Number(vendorRates.length) == 0 ? 0
      : Math.ceil(Number(counter) / Number(vendorRates.length));
    return aggregatedTotalRank;
  };
  //#endregion



  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["VENDORS"]
    )) as any;
    this.lang = lang;

    this.labels = resData.res;
  }


  documentSelectors() {
    $("#areas").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.selectedSearchArea = $("#areas").chosen().val();
    });
  };

    //#region Paging Helpers ..
    pageChange(pageNumber) {
      window.scroll(0,0);
      this.limit = this.pageSize * pageNumber;
      this.skip = Math.abs(this.pageSize - this.limit);
    };
    //#endregion

    //#search region functions
  search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.vendorsList.filter((aVendor) => {
      return (aVendor.area.includes(this.selectedSearchArea))
        || (aVendor.nameEn.includes(this.searchKey)
        || aVendor.nameAr.includes(this.searchKey));
    });

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.searchableList.length;
    }, 0);
  };

  clearSearch(){
    this.showPaging = false;
    this.ngxSpinner.show();
    window.scroll(0,0);
    this.searchableList = this.vendorsList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.vendorsList.length;
      this.searchKey = undefined;
    }, 0);

  };
  //#endregion


}
