import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, responseModel, theme, urls, weddingWebsite, localStorageService } from 'src/app/core';
import { } from '@types/googlemaps';
declare const google: any


@Component({
  selector: 'app-wedding-website',
  templateUrl: './wedding-website.component.html',
  styleUrls: ['./wedding-website.component.scss'],
})
export class WeddingWebsiteComponent implements OnInit, AfterViewInit {
  isRouteAlreadyExists = false;
  saveDisabled = true;
  coverPhotoSource: any = '';

  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  files: File[] = [];

  private geoCoder: any;
  currentUserEmail: string;


  themesTemplates: theme[] = [];
  addressDetails: any[] = [];
  tempAlbumFiles: any[] = [];

  weddingWebsite: weddingWebsite = {
    coverImage : "assets/images/defaults/wedding/cover-photo.png",
    location: {
      venue: "",
      address: "",
      latitude: 0,
      longtitude: 0,
    }
  }
  themeIdValid: boolean;
  weddingTimeValid: boolean;
  routeURLValid: boolean;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private router: Router, private http: httpService,
    private ngxSpinner: NgxSpinnerService, private toastr: ToastrService, private storage: localStorageService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadScripts();
    this.mapsLoader();
    this.loadThemesTemplates();
    this.getCurrentWeddingWebsiteDetails();
  }

  getCurrentWeddingWebsiteDetails(){
    this.ngxSpinner.show();
    let websiteDetialsURL = `${urls.GET_WEDDING_WEBSITE_DETAILS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(websiteDetialsURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        let savedweddingWebsite = response.data as weddingWebsite;

        if(savedweddingWebsite.requestIssued){
          this.weddingWebsite = savedweddingWebsite;
          this.storage.setLocalStorage("weds360#mysite" , this.weddingWebsite);

          // This function converts the imge URL to a file object!
          // Loading the images from the s3 bucket
          // Note I configured the s3 bucket by allowing the cors-origin for localhost
          this.weddingWebsite.album.forEach(async (anImage) => {
            let imageFile = await this.convertURLtoFile(anImage);
            this.files.push(imageFile);
            this.tempAlbumFiles.push({ name: imageFile.name , url: anImage });
          });
          this.setSelectedTemplate(this.weddingWebsite.themeId);
          this.latitude = this.weddingWebsite.location.latitude;
          this.longitude = this.weddingWebsite.location.longtitude;
          this.zoom = 12;
          this.address = this.weddingWebsite.location.address;

          this.router.navigateByUrl('profile/en/user/wedding-website-status');
        } else {
          this.setCurrentLocation();
        }
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your website details.");
      }
    });
  };

  selectTemplate(e: any , templateId) {
    e.preventDefault();
    this.setSelectedTemplate(templateId);
  };

  setSelectedTemplate(templateId){
    this.themesTemplates.forEach((aTheme) => {
      if(aTheme._id != templateId){
        aTheme.isThemeSelected = false;
      }
    });

    let targetTemplate = this.themesTemplates.find(x => x._id == templateId);
    targetTemplate.isThemeSelected = !targetTemplate.isThemeSelected;
    let like = document.getElementById(templateId);

    if (targetTemplate.isThemeSelected) {
      like.classList.add("liked");
      this.weddingWebsite.themeId = templateId
    } else {
      like.classList.remove("liked");
      this.weddingWebsite.themeId = "";
    }
  }

  onCoverPhotoChanged(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity" , constants.S3_CONTAINERS["WEDDING_WEBSITES"]);
      formData.append("isSlefAssigned" , "true");
      formData.append("targetUserEmail" , this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL , {} , formData).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.weddingWebsite.coverImage = response.data;
        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };

  loadThemesTemplates(){
    this.ngxSpinner.show();
    let getAllThemes = `${urls.GET_ALL_THEMES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllThemes , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.themesTemplates = response.data as theme[];
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load any themes!");
      }
    });
  };

  checkWeddingWebsiteRouteUniqness(){
    if(this.weddingWebsite.routeURL == "" || this.weddingWebsite.routeURL.includes(" ")){
      this.isRouteAlreadyExists = false;
      this.saveDisabled = true;
      return;
    }

    let checkingURL = `${urls.CHECK_WEDDING_WEBSITE_UNIQNESS}/${constants.APP_IDENTITY_FOR_USERS}/${this.weddingWebsite.routeURL}`;

    this.http.Get(checkingURL , {} ).subscribe((response: responseModel) => {
      if(!response.error){
        this.isRouteAlreadyExists = response.data.isRouteExisted;
        this.saveDisabled = this.isRouteAlreadyExists;
        this.loadScripts();
      }
    });
  };

  validateWeddingWebsiteDataBeforeSave(){
    this.themeIdValid = this.weddingWebsite.themeId == "" ? false : true;
    this.weddingTimeValid = this.weddingWebsite.weddingTime == "" ? false : true;
    this.routeURLValid = (this.weddingWebsite.routeURL == "" || this.weddingWebsite.routeURL.includes(" ")) ? false : true;

    return this.themeIdValid && this.weddingTimeValid && this.routeURLValid;

  };

  createNewWebsiteRequest() {
    if(!this.saveDisabled){
      if(this.validateWeddingWebsiteDataBeforeSave()){
        this.weddingWebsite.requestIssued = true;
        this.saveWebsiteRequest();
      } else {
        this.toastr.error("Some fields need your attention" , "Give us all the details to make this night joyful.");
      }
    }
  };

  saveWebsiteRequest(){
    this.ngxSpinner.show();
    let weddingWebsiteCreationURL = `${urls.CREATE_WEDDING_WEBSITE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(weddingWebsiteCreationURL , {} , { "weddingWebsite" : this.weddingWebsite }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Your website request has been created!" , "Isn't it amazing, your wedding website awaiting the approval! 🎉 few steps to celebrate.");
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't create your website.");
      }
    })
  };


  //#region Address Helper Function..
  mapsLoader() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = this.weddingWebsite.location.latitude = place.geometry.location.lat();
          this.longitude = this.weddingWebsite.location.longtitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  };

  setCurrentLocation() {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((locationInfo) => {
        this.latitude = this.weddingWebsite.location.latitude = locationInfo.coords.latitude;
        this.longitude = this.weddingWebsite.location.longtitude = locationInfo.coords.longitude;

        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      }, (err) => {
        console.log(err);

        this.latitude = this.weddingWebsite.location.latitude = 30.0444;
        this.longitude = this.weddingWebsite.location.longtitude = 31.2357;

        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      })
    } else {
      this.latitude = this.weddingWebsite.location.latitude = 30.0444;
      this.longitude = this.weddingWebsite.location.longtitude = 31.2357;

      this.zoom = 12;
      this.getAddress(this.latitude, this.longitude);
    }
  };

  markerDragEnd(e: any) {
    this.latitude = this.weddingWebsite.location.latitude = e.coords.lat;
    this.longitude = this.weddingWebsite.location.longtitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  };

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = this.weddingWebsite.location.address = results[0].formatted_address;
          // this.weddingWebsite.addressDetails = results[0].address_components;
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
  onSelect(event: any) {
    for (const key in event.addedFiles) {
      this.ngxSpinner.show();
      const formData = new FormData();
      const imageFile = event.addedFiles[key];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["WEDDING_ALBUMS"]);
      formData.append("isSlefAssigned", "true");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.tempAlbumFiles.push({ name: event.addedFiles[key].name , url: response.data });
          this.files.push(event.addedFiles[key]);

          this.bindTempFilesToWeddingObject();
          console.log("add" , this.weddingWebsite.album);
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
    console.log("remove" , this.weddingWebsite.album);
  };

  bindTempFilesToWeddingObject(){
    this.weddingWebsite.album = [];
    this.tempAlbumFiles.forEach((imge) => {
      this.weddingWebsite.album.push(imge.url);
    });
  };

  async convertURLtoFile(image){
    // image = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    let response = await fetch(image);
    let data = await response.blob();
    let metadata = {
      type: `image/${image.split('.').pop()}`
    };

    return new File([data], image.split('/').pop() , metadata);
  }
  //#endregion

  //#region Loading Proper Helper Function..
  ngAfterViewInit(): void {
    // this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/custom.js', 'assets/scripts/datePickerInitakizer.js'  , 'assets/scripts/dropzone.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  //#endregion
}
