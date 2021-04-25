import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, vendorService, LookupsService, localStorageService, tag, category, responseModel , urls, httpService, vendor } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})

export class VendorServicesComponent implements OnInit {

  servicesList: vendorService[] = [];
  vendor: vendor;
  currentUserEmail;
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  categories: category[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,private lookupsService: LookupsService,
  private actictedRoute: ActivatedRoute) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.vendor = this.storage.getLocalStorage("weds360#vendorOnEdit");
    this.loadResources();
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
    let getAllItemsURL = `${urls.GET_ALL_VENDOR_SERVICES}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(getAllItemsURL, { }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.servicesList = response.data as vendorService[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };


  pageChange(pageNumber){

  };

  editEntity(id: any) {
    this.ngxSpinner.show();
    this.getLookups();
    let targetTheme = this.servicesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#vendorServiceOnEdit", targetTheme);
    this.router.navigate([`profile/en/vendor/services-action/update`]);
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
  };

  navigateToCreateNewService(){
    this.router.navigate(['profile/en/vendor/services-action/new']);
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
