import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, resources, offer, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-offers-grid',
  templateUrl: './offers-grid.component.html',
  styleUrls: ['./offers-grid.component.scss']
})
export class OffersGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  offersList :  offer[] = [];
  lang: string;
  labels: any = {};

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  // Search vars!
  searchableList : offer[] = [];
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
    this.storage.eraseLocalStorage("weds360#offerOnEdit");
  }

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    this.ngxSpinner.show();
    let getAllOffersURL = `${urls.GET_ALL_OFFERS}/${constants.APP_IDENTITY_FOR_USERS}`;


    this.http.Get(getAllOffersURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.offersList = this.searchableList = response.data as offer[];
        this.collectionSize = this.offersList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };

  editEntity(id: any){
    this.router.navigate([`profile/${this.lang}/admin/offers-action/update`]);
    let targetTheme = this.offersList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#offerOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_OFFER}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Offer has been deleted succesfully" , "An offer has been deleted and wedding website will be impacted.");
        this.getAllOffers();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your offer couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewOffer(){
    this.router.navigate([`profile/${this.lang}/admin/offers-action/new`]);
  };

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
      constants.VIEWS["OFFERS"]
    )) as any;
    this.labels = resData.res;
  }

   //#search region functions
   search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.offersList.filter((aOffer) => {
      return  (aOffer.titleEn.includes(this.searchKey)
        || aOffer.titleAr.includes(this.searchKey))
        || (aOffer.descriptionEn.includes(this.searchKey)
        || aOffer.descriptionAr.includes(this.searchKey));
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
    this.searchableList = this.offersList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.offersList.length;
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
