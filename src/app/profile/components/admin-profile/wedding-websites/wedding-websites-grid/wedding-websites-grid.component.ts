import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, weddingWebsite, localStorageService , responseModel , urls , httpService } from 'src/app/core';
declare var $: any;


@Component({
  selector: 'app-wedding-websites-grid',
  templateUrl: './wedding-websites-grid.component.html',
  styleUrls: ['./wedding-websites-grid.component.scss']
})
export class WeddingWebsitesGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  weddingWebsiteList: weddingWebsite[] = [];
  labels:any={};
  lang:string;
  that: any = this;

     // Paging vars!
     collectionSize: number = 0;
     pageSize: any = 5;
     limit: number;
     skip: number;
     showPaging = true;
     // End paging vars!

     // Search vars!
     searchableList : weddingWebsite[] = [];
     selectedSearchCriteria: string = "";
     searchKey = undefined;
     // End search vars!

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#weddingWebsiteOnEdit");
}


  ngOnInit() {
    this.getAllWebsites();
    this.documentSelectors();
  }

  getAllWebsites() {
    this.ngxSpinner.show();
    let getAllWeddingWebsitesURL = `${urls.GET_ALL_WEDDING_LIST}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllWeddingWebsitesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.weddingWebsiteList= this.searchableList = response.data as weddingWebsite[];
        this.collectionSize = this.weddingWebsiteList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  documentSelectors() {
    $("#cats").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.selectedSearchCriteria = $("#cats").chosen().val();
    });
  };

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
        constants.VIEWS["WEDDING_WEBSITE"]
      )) as any;
      this.labels = resData.res;
  };

  //#search region functions
  search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.weddingWebsiteList.filter((aWebsite) => {
      return (aWebsite.name != undefined ? aWebsite.name.includes(this.searchKey) : ""
        || aWebsite.email.includes(this.searchKey)
        || (this.selectedSearchCriteria == "pending" ? aWebsite.isPublished == false
          : (aWebsite.isPublished == false || aWebsite.isPublished)));
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
    this.searchableList = this.weddingWebsiteList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.weddingWebsiteList.length;
      this.searchKey = undefined;
    }, 0);

  };
//#endregion

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion
}
