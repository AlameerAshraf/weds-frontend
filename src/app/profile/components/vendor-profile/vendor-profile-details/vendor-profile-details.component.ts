import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
//import { } from '@types/googlemaps';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router, ActivatedRoute } from '@angular/router';
import { vendor, constants, urls, httpService, responseModel, localStorageService } from 'src/app/core';

declare const google: any
declare var $

@Component({
  selector: 'app-vendor-profile-details',
  templateUrl: './vendor-profile-details.component.html',
  styleUrls: ['./vendor-profile-details.component.scss']
})
export class VendorProfileDetailsComponent implements OnInit, AfterViewInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  is = false;
  coverPhotoSource: any = '';

  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  tagsAr: string[] = [];
  tagsEn: string[] = [];
  htmlContentEnglish;
  htmlContentArabic;
  pinterestUrl;
  instagramUrl;
  twitterUrl;
  facebookUrl;
  categories;
  areas;
  category;
  area;
  priceRanges = constants.PRICE_RANGE;
  priceRange;
  that = this;

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  files: File[] = [];

  private geoCoder: any;

  editingMode = "new";
  layoutRouting = "";

  currentUserEmail: string;
  vendor: vendor = {
    featuredImage: "assets/images/defaults/wedding/cover-photo.png",
    nameAr: "",
    nameEn: "",
    websiteURL: "",
    descriptionAr: "",
    descriptionEn: "",
    order: 0,
    location: {
      guestCount: 0,
      latitude: "",
      longtitude: "",
      typedAddress: "",
    },
    category: "",
    descriptionURLAr: "",
    descriptionURLEn: "",
    isFeatured: false,
    numberOfBookmarks: 0,
    numberOfLoves: 0,
    priceRange: "",
    shortDescriptionAr: "",
    shortDescriptionEn: "",
    segment: "",
    featuredVideo: "",
    arTags: [],
    enTags: [],
    comments: [{}],
    services: [],
    area: [],
    gallery: [],
    ranks: [{}],
    social: [{}],
  };


  constructor(private router: Router, private ngZone: NgZone,
    private toastr: ToastrService, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private mapsAPILoader: MapsAPILoader,
    private http: httpService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService, private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {

    this.mapsLoader();
    this.loadVendorDropdowns();

    this.initVendorView();
    this.loadScripts();
    this.documentSelectors();
  };

  loadVendorDropdowns() {
    this.ngxSpinner.show();
    let categories = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(categories, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.categories = response.data as vendor[];
      } else {
      }
    });

    // let areas = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;

    // this.http.Get(areas, {}).subscribe((response: responseModel) => {
    //   if (!response.error) {
    //     this.areas = response.data as vendor[];
    //   } else {
    //   }
    // });

    let tags = `${urls.GET_ALL_TAGS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(tags, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        for (let i = 0; i < response.data.length; i++) {

          if (response.data[i].langauge == "Ar")
            this.tagsAr.push(response.data[i])
          else
            this.tagsEn.push(response.data[i])



        }
        console.log(this.tagsEn)
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };

  initVendorView() {
    if (this.editingMode == "update") {
      this.vendor = this.storage.getLocalStorage("weds360#vendorOnEdit");
    }
  };

  documentSelectors() {
    $("#tagsAr").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsAr");

      e.data.angularThis.tagsAr = $("#tagsAr").chosen().val();
    });

    $("#tagsEn").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsEn");

      e.data.angularThis.tagsEn = $("#tagsEn").chosen().val();
    });

    $("#priceRanges").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.priceRange = $("#priceRanges").chosen().val();
    });
    $("#areas").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.area = $("#areas").chosen().val();
    });
    $("#categories").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.category = $("#categories").chosen().val();
    });
  };

  createNewEntity() {
    this.ngxSpinner.show();
    this.vendor.area = this.area;
    this.vendor.priceRange = this.priceRange;
    this.vendor.category = this.category;
    this.vendor.area = this.area;
    this.vendor.descriptionURLAr = this.htmlContentArabic;
    this.vendor.descriptionURLEn = this.htmlContentEnglish;
    this.vendor.arTags = this.tagsAr;
    this.vendor.enTags = this.tagsEn;
    this.vendor.location.latitude = this.latitude.toString();
    this.vendor.location.longtitude = this.longitude.toString();
    if (this.facebookUrl != "")
      this.vendor.social.push(this.facebookUrl);
    if (this.twitterUrl != "")
      this.vendor.social.push(this.twitterUrl);
    if (this.instagramUrl != "")
      this.vendor.social.push(this.instagramUrl);
    if (this.pinterestUrl != "")
      this.vendor.social.push(this.pinterestUrl);

    let createURL = `${urls.CREATE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Post(createURL, {}, { "vendor": this.vendor }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Vendor has been saved succesfully", "A vendor has been created.");
        this.router.navigateByUrl('/profile/en/vendor/overview');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your vendor couldn't created on the server!");
      }
    });
  };

  updateExistingEntity() {
    this.ngxSpinner.show();

    this.vendor.area = this.area;
    this.vendor.priceRange = this.priceRange;
    this.vendor.category = this.category;
    this.vendor.area = this.area;
    this.vendor.descriptionURLAr = this.htmlContentArabic;
    this.vendor.descriptionURLEn = this.htmlContentEnglish;
    this.vendor.arTags = this.tagsAr;
    this.vendor.enTags = this.tagsEn;
    this.vendor.location.latitude = this.latitude.toString();
    this.vendor.location.longtitude = this.longitude.toString();
    if (this.facebookUrl != "")
      this.vendor.social.push(this.facebookUrl);
    if (this.twitterUrl != "")
      this.vendor.social.push(this.twitterUrl);
    if (this.instagramUrl != "")
      this.vendor.social.push(this.instagramUrl);
    if (this.pinterestUrl != "")
      this.vendor.social.push(this.pinterestUrl);

    let updateURL = `${urls.UPDATE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(updateURL, {}, { "vendor": this.vendor }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Vendor has been saved succesfully", "Vendor has been updated, Bingo!");
        this.router.navigateByUrl('/profile/en/vendor/overview');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your vendor couldn't created on the server!");
      }
    });
  };

  uploadImage(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["VENDOR"]);
      formData.append("isSlefAssigned", "false");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.vendor.featuredImage = response.data;
        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };

  //#region Maps Helpers..
  onFileSelected(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return this.coverPhotoSource = fileReader.result;
      };
      fileReader.readAsDataURL(imageFile);
    }
  };

  mapsLoader() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  };

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  };

  markerDragEnd(e: any) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  };

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  //#endregion

  //#region  Scripts Loading helpers..
  ngAfterViewInit(): void {
    this.loadScripts();
    this.documentSelectors();

  };


  loadScripts() {
    let scripts = ['assets/scripts/datePickerInitakizer.js', 'assets/scripts/custom.js', 'assets/scripts/dropzone.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

  //#endregion
}
