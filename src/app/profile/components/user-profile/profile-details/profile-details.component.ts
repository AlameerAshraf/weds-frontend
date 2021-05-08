import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, responseModel, urls,resources, user } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var google: any
declare var $;
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, AfterViewInit {
  labels:any={};
  lang:string;
  that = this;


  private geoCoder: any;
  zoom: number = 12;

  currentUserEmail: string;

  user: user = new user();

  latitude: number;
  longitude: number;

  faceBookURL = "";
  twitterURL = "";

  reset : { email?: string, oldPassword?: string , newPassword?: string , confirmNewPassword?: string } = {};

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService , private resources: resources,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.user.settings.cover = 'http://via.placeholder.com/1920x315';
      this.user.settings.avatar = 'assets/images/defaults/avatar/vendor.png';
    }

  ngOnInit() {
    window.scroll(0 ,0);
    this.documentSelectors();

    this.loadUser();
    this.loadResources();
  };

  loadUser(){
    let loadUserURL = `${urls.GET_USER_DATA}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(loadUserURL , { "role" : atob(window.localStorage.getItem("weds360#role")) }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        let savedUser = response.data as user;
        this.user.email = savedUser.email;

        if(savedUser != null){
          this.user = savedUser
          this.user.settings.cover = this.user.settings.cover || 'http://via.placeholder.com/1920x315';
          this.user.settings.avatar = this.user.settings.avatar || 'assets/images/defaults/avatar/vendor.png';
          this.user.address.latitude = this.latitude =  this.user.address.latitude;
          this.user.address.longtitude = this.longitude = this.user.address.longtitude;
          this.zoom = 8;
          this.twitterURL = this.user.social.find(x => x.includes("twitter")) || "";
          this.faceBookURL = this.user.social.find(x => x.includes("facebook")) || "";
        } else {
          this.setCurrentLocation();
        }
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    });
  };

  updateUserInfo(){
    this.ngxSpinner.show();
    let dateValue: any = document.getElementById("date-picker");
    this.user.dateOfBirth = dateValue.value;
    this.user.social = [this.faceBookURL , this.twitterURL];

    let updatePersonalInfoURL = `${urls.UPDATE_USER}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(updatePersonalInfoURL , {} , { "user" : this.user }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Gooood!", "Your data has been updated successfully 💕");
        this.loadUser();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "My bad, server couldn't create your post.");
      }
    });
  };

  documentSelectors() {
    $("#gender").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.user.gender = $("#gender").chosen().val();
    });
  };

  resetPassword(){
    if(this.reset.newPassword == this.reset.confirmNewPassword){
      let resetUserPasswordURL = `${urls.RESEt_USER_PASSSWORD}/${constants.APP_IDENTITY_FOR_USERS}`;


      this.reset.email = this.currentUserEmail;
      this.http.Post(resetUserPasswordURL , { "mode" : "in_app" } , { "resetData" : this.reset }).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.reset.newPassword = "";
          this.reset.oldPassword = "";
          this.reset.confirmNewPassword = "";
          this.toastr.success("We've updated your password!" , "Okay done, password changed successfully.");
        } else{
          this.ngxSpinner.hide();
          this.toastr.error("Our bad sorry!" , "Ooh Sorry, maube you misstyped your password, try again!");
        }
      })
    } else {
      this.toastr.error("New passworddidn't match" , "Passwords are not the same, be calm and try again its easy ❤");
    }
  };


  //#region Image Uploader Helpers
  uploadProfilePicture(e: any): void {
    this.ngxSpinner.show();
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("targetEntity", "PROFILE_ASSETS");
    formData.append("isSlefAssigned", "true");
    formData.append("targetUserEmail", this.currentUserEmail);

    let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
      if (!response.error) {
        this.user.settings.avatar = response.data;
        this.ngxSpinner.hide();
        this.toastr.success("Avatar has been updated" , "Woooow! what a nice image 😍 your photo has been uploaded successfully");
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("My Bad, can't upload your avatar!")
      }
    });
  };

  getAvatar() {
    document.getElementById("upImage").click();
  };

  uploadCoverImage(e: any): void {
    this.ngxSpinner.show();
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("targetEntity", "PROFILE_ASSETS");
    formData.append("isSlefAssigned", "true");
    formData.append("targetUserEmail", this.currentUserEmail);

    let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
      if (!response.error) {
        this.user.settings.cover = response.data;
        this.ngxSpinner.hide();
        this.toastr.success("Avatar has been updated" , "Woooow! what a nice image 😍 your photo has been uploaded successfully");
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("My Bad, can't upload your avatar!")
      }
    });
  };

  getCover() {
    document.getElementById("upCover").click();
  };
  //#endregion

  //#region Adress Helper..
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((locationInfo) => {
        if ((this.user.address.latitude != undefined && this.user.address.latitude != 0)
          && (this.user.address.longtitude != undefined && this.user.address.longtitude != 0)) {
          this.latitude = Number(this.user.address.latitude);
          this.longitude = Number(this.user.address.longtitude);
        }
        else {
          this.latitude = locationInfo.coords.latitude;
          this.longitude = locationInfo.coords.longitude;
        }
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      }, (err) => {
        console.log(err);

        this.latitude = 27.027816;
        this.longitude = 31.830397;

        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      })
    } else {
      this.latitude = 27.027816;
      this.longitude = 31.830397;

      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    }
  };

  markerDragEnd(e: any) {
    this.latitude = this.user.address.latitude = e.coords.lat;
    this.longitude = this.user.address.longtitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  };

  getAddress(latitude: number, longitude: number) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results)
          this.user.address.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };
  //#endregion

  //#region scripts helpers.
  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/datePickerInitakizer.js' , 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  //#endregion

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
        constants.VIEWS["PROFILE_LAYOUT"]
      )) as any;
      this.labels = resData.res;
  };
}
