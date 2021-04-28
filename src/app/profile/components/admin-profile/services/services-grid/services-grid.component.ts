import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, tag, category, vendor, LookupsService, vendorService, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.scss']
})
export class ServicesGridComponent implements OnInit {
  servicesList: vendorService[] = [];
  currentUserEmail;
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  categories: category[] = [];
  vendors: vendor[] = [];

     // Paging vars!
     collectionSize: number = 0;
     pageSize: any = 5;
     limit: number;
     skip: number;
     showPaging = true;
     // End paging vars!

     // Search vars!
     searchableList : vendorService[] = [];
     searchKey = undefined;
     // End search vars!


  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,private lookupsService: LookupsService,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.storage.eraseLocalStorage("weds360#vendorServiceOnEdit");
}

  ngOnInit() {
    this.getAllVendorServices();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllVendorServices() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_VENDOR_SERVICES}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?list=all`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.servicesList = response.data as vendorService[];
        this.servicesList = this.searchableList = this.servicesList.filter(x => x.isActive == true);
        this.collectionSize = this.servicesList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  editEntity(id: any){
    this.ngxSpinner.show();
    this.getLookups();
    let targetTheme = this.servicesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#vendorServiceOnEdit", targetTheme);
    this.router.navigate([`profile/en/admin/services-action/update`]);
    this.ngxSpinner.hide();
  };

  async getLookups() {
    this.categories = ((await this.lookupsService.getCategories()) as responseModel).data;
    this.storage.setLocalStorage("weds360#categories", this.categories);

    let allTags = (await this.lookupsService.getTags()) as responseModel;
    this.tagsAr = allTags.data.filter((tag: any) => {
      return tag.langauge == "Ar";
    });
    this.storage.setLocalStorage("weds360#tagsAr", this.tagsAr);

    this.tagsEn = allTags.data.filter((tag: any) => {
      return tag.langauge == "En";
    });
    this.storage.setLocalStorage("weds360#tagsEn", this.tagsEn);

    this.vendors = ((await this.lookupsService.getVendorsAsLookups()) as responseModel).data;
    this.storage.setLocalStorage("weds360#vendors", this.vendors);
  };

  async navigateToCreateNewService(){
    await this.getLookups();
    this.router.navigate(['profile/en/admin/services-action/new']);
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

  //#search region functions
  search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.servicesList.filter((aService) => {
      return (aService.attributes.nameEn.includes(this.searchKey))
        || (aService.attributes.nameAr.includes(this.searchKey))
        || (aService.attributes.descriptionEn.includes(this.searchKey))
        || (aService.attributes.descriptionAr.includes(this.searchKey))
        || (aService.type.includes(this.searchKey))
        || (aService.vendorNameAr.includes(this.searchKey)
        || aService.vendorNameEn.includes(this.searchKey));
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
    this.searchableList = this.servicesList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.servicesList.length;
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
