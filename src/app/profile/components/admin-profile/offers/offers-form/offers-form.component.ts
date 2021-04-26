import { NgxSpinnerService } from 'ngx-spinner';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { offer,vendor, constants, urls, httpService, responseModel, localStorageService,resources } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-offers-form',
  templateUrl: './offers-form.component.html',
  styleUrls: ['./offers-form.component.scss']
})
export class OffersFormComponent implements OnInit, AfterViewInit {

  editingMode = "new";
  that = this;
  vendor = "";

  currentUserEmail: string;
  offersVendors : any;
  offer: offer = {
    image: "assets/images/defaults/wedding/cover-photo.png",
    descriptionAr: "",
    descriptionEn: "",
    residesIn: "",
    titleAr: "",
    titleEn: "",
    vendor: ""
  };
  lang: string;
  labels: any = {};

  constructor(private ngxSpinner: NgxSpinnerService, private router: Router,
    @Inject(DOCUMENT) private document: any,private activatedRoute: ActivatedRoute,
     private elementRef: ElementRef,private storage: localStorageService,private resources: resources,
     private http: httpService,    private toastr: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

      this.activatedRoute.params.subscribe((params) => {
        this.editingMode = params["actionType"];
      });
     }

  ngOnInit() {
    this.loadScripts();
    this.loadOffersVendor();
    this.initOfferView();
    this.documentSelectors();
    this.loadResources();
  }

  loadOffersVendor(){
    this.ngxSpinner.show();
    let getAllOffersVendorsURL = `${urls.GET_ALL_VENDORS}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllOffersVendorsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.offersVendors = response.data as vendor[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  initOfferView(){
    if(this.editingMode == "update"){
      this.offer = this.storage.getLocalStorage("weds360#offerOnEdit");
    }
  };

  createNewEntity(){
    this.ngxSpinner.show();
    this.offer.vendor = this.vendor;

    let createURL = `${urls.CREATE_OFFER}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL , {} , { "offer" : this.offer }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Offer has been saved succesfully" , "Offer has been updated, Bingo!");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/offers-defaults`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your offer couldn't created on the server!");
      }
    });
  };

  updateExistingEntity(){
    this.ngxSpinner.show();
    this.offer.vendor = this.vendor == "" ? this.offer.vendor : this.vendor;

    let updateURL = `${urls.UPDATE_OFFER}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.offer._id}`;
    this.http.Post(updateURL , {} , { "offer" : this.offer }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Offer has been saved succesfully" , "A new offer has been updated and wedding website will be impacted.");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/offers-defaults`);
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your offer couldn't created on the server!");
      }
    });
  };

  uploadImage(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity" , constants.S3_CONTAINERS["OFFERS"]);
      formData.append("isSlefAssigned" , "false");
      formData.append("targetUserEmail" , this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL , {} , formData).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.offer.image = response.data;
        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };

  documentSelectors(){
    $("#offerVendors").change({ angularThis: this.that } ,function(e, params){
      e.data.angularThis.vendor = $("#offerVendors").chosen().val();
    });
    $("#offersResides").change({ angularThis: this.that } ,function(e, params){
      e.data.angularThis.layoutRouting = $("#offersResides").chosen().val();
    });
  };

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/offers-defaults`);
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
      constants.VIEWS["OFFERS"]
    )) as any;
    this.labels = resData.res;
  }
}
