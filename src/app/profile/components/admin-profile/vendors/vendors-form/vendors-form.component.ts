import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MapsAPILoader } from "@agm/core";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  ElementRef,
  NgZone,
  ViewChild,
} from "@angular/core";
//import { } from '@types/googlemaps';
import { Router, ActivatedRoute } from "@angular/router";
import {
  vendor,
  LookupsService,
  constants,
  urls,
  httpService,
  responseModel,
  localStorageService,
  tag,
  category,
  area,
  resources,
} from "src/app/core";
import { environment } from "src/environments/environment";
declare const google: any;
declare var $;

@Component({
  selector: "app-vendors-form",
  templateUrl: "./vendors-form.component.html",
  styleUrls: ["./vendors-form.component.scss"],
})
export class VendorsFormComponent implements OnInit {
  @ViewChild("search", { static: true }) public searchElementRef: ElementRef;

  is = false;
  coverPhotoSource: any = "";
  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  files: File[] = [];
  private geoCoder: any;
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  socialArray: string[] = [];
  htmlContentEnglish: any;
  htmlContentArabic: any;
  pinterestUrl: any;
  instagramUrl: any;
  twitterUrl: any;
  facebookUrl: any;

  categories: category[] = [];
  areas: area[] = [];
  priceRanges = constants.PRICE_RANGE;
  segments = constants.SEGMENTS;
  tempAlbumFiles: any[] = [];
  that = this;
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

  labels: any = {};
  lang: string;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private lookupsService: LookupsService,
    private http: httpService,
    private activatedRoute: ActivatedRoute,
    private storage: localStorageService,
    private ngxSpinner: NgxSpinnerService,
    private resources: resources
  ) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  async ngOnInit() {
    this.mapsLoader();
    this.loadResources();
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();
    this.initVendorView();
    this.loadScripts();
    this.documentSelectors();
  }

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

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/vendors-list`);
  }

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
  }

  initVendorView() {
    if (this.editingMode == "update") {
      this.vendor = this.storage.getLocalStorage("weds360#vendorOnEdit");
      if (this.vendor.featuredImage == undefined)
        this.vendor.featuredImage =
          "assets/images/defaults/wedding/cover-photo.png";
      this.mapData();
      this.loadGalleryPhotos();
      this.socailMediaData();
    }
  }

  loadGalleryPhotos() {
    this.vendor.gallery.forEach(async (anImage) => {
      let imageFile = await this.convertURLtoFile(anImage);
      this.files.push(imageFile);
      this.tempAlbumFiles.push({ name: imageFile.name, url: anImage });
    });
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
  }

  createNewEntity() {
    this.ngxSpinner.show();
    this.vendor.location.latitude = this.latitude.toString();
    this.vendor.location.longtitude = this.longitude.toString();
    if (this.facebookUrl != "")
      this.vendor.social.push( this.facebookUrl.toLowerCase());
    if (this.twitterUrl != "")
      this.vendor.social.push( this.twitterUrl.toLowerCase());
    if (this.instagramUrl != "")
      this.vendor.social.push( this.instagramUrl.toLowerCase());
    if (this.pinterestUrl != "")
      this.vendor.social.push( this.pinterestUrl.toLowerCase());

    let createURL = `${urls.CREATE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http
      .Post(createURL, {}, { vendor: this.vendor })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Vendor has been saved succesfully",
            "A vendor has been created."
          );
          this.router.navigateByUrl(`/profile/${this.lang}/admin/vendors-list`);
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your vendor couldn't created on the server!"
          );
        }
      });
  }

  updateExistingEntity() {
    this.ngxSpinner.show();
    this.vendor.location.latitude = this.latitude.toString();
    this.vendor.location.longtitude = this.longitude.toString();
    if (this.facebookUrl != "")
      this.socialArray.push(this.facebookUrl.toLowerCase());
    if (this.twitterUrl != "")
      this.socialArray.push(this.twitterUrl.toLowerCase());
    if (this.instagramUrl != "")
      this.socialArray.push(this.instagramUrl.toLowerCase());
    if (this.pinterestUrl != "")
      this.socialArray.push(this.pinterestUrl.toLowerCase());

    this.vendor.social = this.socialArray;

    let updateURL = `${urls.UPDATE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http
      .Post(updateURL, {}, { vendor: this.vendor })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Vendor has been saved succesfully",
            "Vendor has been updated, Bingo!"
          );
          this.router.navigateByUrl("/profile/en/admin/vendors-list");
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your vendor couldn't created on the server!"
          );
        }
      });
  }

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
      this.http
        .Post(uploadImageURL, {}, formData)
        .subscribe((response: responseModel) => {
          if (!response.error) {
            this.ngxSpinner.hide();
            this.vendor.featuredImage = response.data;
          } else {
            this.ngxSpinner.hide();
          }
        });
    }
  }

  onFileSelected(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return (this.coverPhotoSource = fileReader.result);
      };
      fileReader.readAsDataURL(imageFile);
    }
  }

  mapsLoader() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
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
  }

  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (locationInfo) => {
          if (
            this.vendor.location.latitude != undefined &&
            this.vendor.location.latitude != "" &&
            this.vendor.location.longtitude != undefined &&
            this.vendor.location.longtitude != ""
          ) {
            this.latitude = parseFloat(this.vendor.location.latitude);
            this.longitude = parseFloat(this.vendor.location.longtitude);
          } else {
            this.latitude = locationInfo.coords.latitude;
            this.longitude = locationInfo.coords.longitude;
          }

          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        },
        (err) => {
          console.log(err);

          this.latitude = 30.0444;
          this.longitude = 31.2357;

          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        }
      );
    } else {
      this.latitude = 30.0444;
      this.longitude = 31.2357;

      this.zoom = 12;
      this.getAddress(this.latitude, this.longitude);
    }
  }

  markerDragEnd(e: any) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.vendor.location.typedAddress = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  async ngAfterViewInit() {
    this.ngxSpinner.show();
    let tempVar = await this.getLookups();
    this.ngxSpinner.hide();

    this.loadScripts();
    this.documentSelectors();
  }

  loadScripts() {
    let scripts = [
      "assets/scripts/datePickerInitakizer.js",
      "assets/scripts/custom.js",
      "assets/scripts/dropzone.js",
    ];

    scripts.forEach((element) => {
      const s = this.document.createElement("script");
      s.type = "text/javascript";
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  }

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
      this.http
        .Post(uploadImageURL, {}, formData)
        .subscribe((response: responseModel) => {
          if (!response.error) {
            this.ngxSpinner.hide();
            this.tempAlbumFiles.push({
              name: event.addedFiles[key].name,
              url: response.data,
            });
            this.files.push(event.addedFiles[key]);

            this.bindTempFilesToWeddingObject();
            console.log("add", this.vendor.gallery);
            // this.weddingWebsite.album.push(response.data);
          } else {
            this.ngxSpinner.hide();
          }
        });
    }
  }

  onRemove(event: any) {
    console.log(event.name);
    let targetFileInTemp = this.tempAlbumFiles.findIndex(
      (x) => x.name == event.name
    );

    this.files.splice(this.files.indexOf(event), 1);
    this.tempAlbumFiles.splice(targetFileInTemp, 1);

    this.bindTempFilesToWeddingObject();
  }

  bindTempFilesToWeddingObject() {
    this.vendor.gallery = [];
    this.tempAlbumFiles.forEach((imge) => {
      this.vendor.gallery.push(imge.url);
    });
  }

  async convertURLtoFile(image) {
    // image = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    let response = await fetch(image);
    let data = await response.blob();
    let metadata = {
      type: `image/${image.split(".").pop()}`,
    };

    return new File([data], image.split("/").pop(), metadata);
  }

  enTagsContainsTag(tagId) {
    return this.vendor.enTags.some((entry) => entry === tagId);
  }

  arTagsContainsTag(tagId) {
    return this.vendor.arTags.some((entry) => entry === tagId);
  }

  areasContainsArea(areaId) {
    return this.vendor.area.some((entry) => entry === areaId);
  }

  mapData() {
    this.latitude = parseFloat(this.vendor.location.latitude);
    this.longitude = parseFloat(this.vendor.location.longtitude);
  }

  socailMediaData() {
    this.facebookUrl = this.vendor.social.find(x => x.includes('facebook') == true)
    this.twitterUrl = this.vendor.social.find(x => x.includes('twitter') == true);
    this.instagramUrl = this.vendor.social.find(x => x.includes('instagram') == true);
    this.pinterestUrl = this.vendor.social.find(x => x.includes('pinterest') == true);
  }
}
