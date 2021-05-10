import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, vendor, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendors-grid',
  templateUrl: './vendors-grid.component.html',
  styleUrls: ['./vendors-grid.component.scss']
})
export class VendorsGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  vendorsList: vendor[] = [];
  labels: any = {};
  lang: string;

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  // Search vars!
  searchableList : vendor[] = [];
  searchKey = undefined;
  // End search vars!


  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#vendorOnEdit");
}

  ngOnInit() {
    this.getAllVendors();
  }

  getAllVendors() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_VENDORS}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.vendorsList = response.data as vendor[];
        this.vendorsList = this.searchableList = this.vendorsList;
        this.collectionSize = this.vendorsList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  editEntity(id: any){
    this.router.navigate([`profile/${this.lang}/admin/vendors-action/update`]);
    let targetTheme = this.vendorsList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#vendorOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(deleteURL , {} , {"vendorId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Vendor has been deleted succesfully" , "An vendor has been deleted.");
        this.getAllVendors();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your vendor couldn't deleted on the server!");
      }
    });
  };

  publishVendor(id: any){

  }

  navigateToCreateNewVendor(){
    this.router.navigate([`profile/${this.lang}/admin/vendors-action/new`]);
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
    this.labels = resData.res;
  }

   //#search region functions
   search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.vendorsList.filter((aVendor) => {
      return (aVendor.email != undefined ? aVendor.email.includes(this.searchKey) : "")
        || (aVendor.phone.includes(this.searchKey))
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

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion

}
