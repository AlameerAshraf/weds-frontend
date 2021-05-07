import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { constants ,httpService,resources, responseModel, urls} from 'src/app/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-profile-details',
  templateUrl: './admin-profile-details.component.html',
  styleUrls: ['./admin-profile-details.component.scss']
})
export class AdminProfileDetailsComponent implements OnInit, AfterViewInit {
  coverPhotoSource: string | ArrayBuffer = ''
  labels:any={};
  lang:string;

  reset : { email?: string, oldPassword?: string , newPassword?: string , confirmNewPassword?: string } = {};
  currentUserEmail: string;
  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,private resources: resources,
    private http: httpService, private ngxSpinner: NgxSpinnerService, private toaster: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }

  ngOnInit() {
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
          this.toaster.success("We've updated your password!" , "Okay done, password changed successfully.");
        } else{
          this.ngxSpinner.hide();
          this.toaster.error("Our bad sorry!" , "Ooh Sorry, maube you misstyped your password, try again!");
        }
      })
    } else {
      this.toaster.error("New passworddidn't match" , "Passwords are not the same, be calm and try again its easy ❤");
    }
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
