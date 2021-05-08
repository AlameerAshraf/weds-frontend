import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, responseModel, urls,resources, user } from 'src/app/core';
declare var $;

@Component({
  selector: 'app-admin-profile-details',
  templateUrl: './admin-profile-details.component.html',
  styleUrls: ['./admin-profile-details.component.scss']
})
export class AdminProfileDetailsComponent implements OnInit, AfterViewInit {
  coverPhotoSource: string | ArrayBuffer = ''
  labels:any={};
  lang:string;
  that = this;

  currentUserEmail: string;

  user: user = new user();

  faceBookURL = "";
  twitterURL = "";


  reset : { email?: string, oldPassword?: string , newPassword?: string , confirmNewPassword?: string } = {};

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,private resources: resources,
    private http: httpService, private ngxSpinner: NgxSpinnerService, private toastr: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.user.settings.cover = 'http://via.placeholder.com/1920x315';
      this.user.settings.avatar = 'assets/images/defaults/avatar/vendor.png';
    }

  ngOnInit() {
    window.scroll(0 ,0);
    this.documentSelectors();

    this.loadUser();
    this.loadResources();
  }

  resetPassword(){
    if(this.reset.newPassword == this.reset.confirmNewPassword){
      let resetUserPasswordURL = `${urls.RESEt_USER_PASSSWORD}/${constants.APP_IDENTITY_FOR_ADMINS}`;


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

  loadUser(){
    let loadUserURL = `${urls.GET_USER_DATA}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(loadUserURL , { "role" : atob(window.localStorage.getItem("weds360#role")) }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.user = response.data as user;
        console.log(this.user)
        this.user.settings.cover = this.user.settings.cover || 'http://via.placeholder.com/1920x315';
        this.user.settings.avatar = this.user.settings.avatar || 'assets/images/defaults/avatar/vendor.png';
        this.twitterURL = this.user.social.find(x => x.includes("twitter")) || "";
        this.faceBookURL = this.user.social.find(x => x.includes("facebook")) || "";
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
        this.loadUser();
        this.toastr.success("Gooood!", "Your data has been updated successfully 💕");
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


  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/datePickerInitakizer.js'];

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
        constants.VIEWS["PROFILE_LAYOUT"]
      )) as any;
      this.labels = resData.res;
  };
}
