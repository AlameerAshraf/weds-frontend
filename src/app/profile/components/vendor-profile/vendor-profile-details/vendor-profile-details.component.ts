import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vendor, LookupsService, constants, urls, httpService, responseModel, localStorageService, tag } from 'src/app/core';

declare const google: any
declare var $;

@Component({
  selector: 'app-vendor-profile-details',
  templateUrl: './vendor-profile-details.component.html',
  styleUrls: ['./vendor-profile-details.component.scss']
})
export class VendorProfileDetailsComponent implements OnInit, AfterViewInit {


  is = false;
  coverPhotoSource: any = '';

  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  socialArray: any[] = [];
  htmlContentEnglish;
  htmlContentArabic;
  pinterestUrl;
  instagramUrl;
  twitterUrl;
  facebookUrl;
  categories;
  areas;
  priceRanges = constants.PRICE_RANGE;
  segments = constants.SEGMENTS;
  tempAlbumFiles: any[] = [];
  that = this;

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  files: File[] = [];

  private geoCoder: any;

  editingMode = "new";
  layoutRouting = "";

  currentUserEmail: string;
  vendor: vendor = {
    featuredImage: "assets/images/defaults/wedding/cover-photo.png",
    username: "",
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
    comments: [],
    services: [],
    area: [],
    gallery: [],
    ranks: [],
    social: [],
  };


  constructor(private router: Router, private ngZone: NgZone,
    private toastr: ToastrService, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private mapsAPILoader: MapsAPILoader,
    private http: httpService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService, private ngxSpinner: NgxSpinnerService,
    private lookupsService: LookupsService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  async ngOnInit() {
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();

    this.loadUser();

    this.loadScripts();
    this.documentSelectors();
  };

  async getLookups() {
    let allTags = (await this.lookupsService.getTags()) as responseModel;
    this.tagsAr = allTags.data.filter((tag: any) => {
      return tag.langauge == "Ar";
    });

    this.tagsEn = allTags.data.filter((tag: any) => {
      return tag.langauge == "En";
    });

    this.categories = ((await this.lookupsService.getCategories()) as responseModel).data;
    this.areas = ((await this.lookupsService.getAreas()) as responseModel).data;
  };

  loadUser() {
    let loadUserURL = `${urls.GET_USER_DATA}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(loadUserURL, { "role": atob(window.localStorage.getItem("weds360#role")) }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.vendor = response.data.vendorRefrence;
        this.mapData();
        this.loadGalleryPhotos();
        this.socailMediaData();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "My bad, server couldn't load your budegeters.");
      }
    });
  };

  loadGalleryPhotos() {
    this.vendor.gallery.forEach(async (anImage) => {
      let imageFile = await this.convertURLtoFile(anImage);
      this.files.push(imageFile);
      this.tempAlbumFiles.push({ name: imageFile.name, url: anImage });
    })
  }

  documentSelectors() {
    $("#tagsAr").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsAr");

      e.data.angularThis.vendor.arTags = $("#tagsAr").chosen().val();
    });

    $("#tagsEn").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsEn");

      e.data.angularThis.vendor.enTags = $("#tagsEn").chosen().val();
    });

    $("#priceRanges").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.vendor.priceRange = $("#priceRanges").chosen().val();
    });

    $("#areas").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.vendor.area = $("#areas").chosen().val();
    });

    $("#categories").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.vendor.category = $("#categories").chosen().val();
    });

    $("#segments").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.vendor.segment = $("#segments").chosen().val();
    });
  };

  updateExistingEntity() {
    this.ngxSpinner.show();
    this.vendor.location.latitude = this.latitude.toString();
    this.vendor.location.longtitude = this.longitude.toString();
    if (this.facebookUrl != "")
      this.socialArray.push({
        source: "facebook",
        url: this.facebookUrl
      });
    if (this.twitterUrl != "")
      this.socialArray.push({
        source: "twitter",
        url: this.twitterUrl
      });
    if (this.instagramUrl != "")
      this.socialArray.push({
        source: "instagram",
        url: this.instagramUrl
      });
    if (this.pinterestUrl != "")
      this.socialArray.push({
        source: "pinterest",
        url: this.pinterestUrl
      });

    this.vendor.social = this.socialArray;

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
      formData.append("isSlefAssigned", "true");
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

  enTagsContainsTag(tagId: any) {
    return this.vendor.enTags.some(entry => entry === tagId);
  }

  arTagsContainsTag(tagId: any) {
    return this.vendor.arTags.some(entry => entry === tagId);
  }

  areasContainsArea(areaId: any) {
    return this.vendor.area.some(entry => entry === areaId);
  };

  mapData() {
    this.latitude = parseFloat(this.vendor.location.latitude);
    this.longitude = parseFloat(this.vendor.location.longtitude);
  };


  //#region Maps Helpers..
  mapsLoader() {
    alert("Map loaded");
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
      navigator.geolocation.getCurrentPosition((locationInfo) => {
        if ((this.vendor.location.latitude != undefined && this.vendor.location.latitude != "")
          && (this.vendor.location.longtitude != undefined && this.vendor.location.longtitude != "")) {
          this.latitude = parseFloat(this.vendor.location.latitude);
          this.longitude = parseFloat(this.vendor.location.longtitude);
        }
        else {
          this.latitude = locationInfo.coords.latitude;
          this.longitude = locationInfo.coords.longitude;
        }

        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      }, (err) => {
        console.log(err);

        this.latitude = 30.0444;
        this.longitude = 31.2357;

        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      })
    } else {
      this.latitude = 30.0444;
      this.longitude = 31.2357;

      this.zoom = 12;
      this.getAddress(this.latitude, this.longitude);
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
          this.vendor.location.typedAddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };
  //#endregion

  //#region  DropZone Engine Helper Function..

  socailMediaData() {
    console.log(this.vendor)
    this.facebookUrl = this.vendor.social.filter((social: any) => {
      return social.source == "facebook";
    })[0].url;
    console.log(this.facebookUrl)
    this.twitterUrl = this.vendor.social.filter((social: any) => {
      return social.source == "twitter";
    })[0].url;
    this.instagramUrl = this.vendor.social.filter((social: any) => {
      return social.source == "instagram";
    })[0].url;
    this.pinterestUrl = this.vendor.social.filter((social: any) => {
      return social.source == "pinterest";
    })[0].url;
  };

  onSelect(event: any) {
    for (const key in event.addedFiles) {
      this.ngxSpinner.show();
      const formData = new FormData();
      const imageFile = event.addedFiles[key];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["VENDOR_ALBUMS"]);
      formData.append("isSlefAssigned", "true");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.tempAlbumFiles.push({ name: event.addedFiles[key].name, url: response.data });
          this.files.push(event.addedFiles[key]);

          this.bindTempFilesToWeddingObject();
          console.log("add", this.vendor.gallery);
          // this.weddingWebsite.album.push(response.data);
        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };

  onRemove(event: any) {
    console.log(event.name)
    let targetFileInTemp = this.tempAlbumFiles.findIndex(x => x.name == event.name);

    this.files.splice(this.files.indexOf(event), 1);
    this.tempAlbumFiles.splice(targetFileInTemp, 1);

    this.bindTempFilesToWeddingObject();
  };

  bindTempFilesToWeddingObject() {
    this.vendor.gallery = [];
    this.tempAlbumFiles.forEach((imge) => {
      this.vendor.gallery.push(imge.url);
    });
  };

  async convertURLtoFile(image) {
    // image = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    let response = await fetch(image);
    let data = await response.blob();
    let metadata = {
      type: `image/${image.split('.').pop()}`
    };

    return new File([data], image.split('/').pop(), metadata);
  }
  //#endregion

  //#region  Scripts Loading helpers..
  async ngAfterViewInit() {
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();

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
