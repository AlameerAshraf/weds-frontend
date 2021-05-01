import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, resources, weddingDetials, httpService, urls, responseModel } from 'src/app/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-wedding-details',
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {
  lang: string;
  labels: any = {};
  weddingDetails: weddingDetials = new weddingDetials();
  currentUserEmail: string;
  constructor(@Inject(DOCUMENT) private document: any, private resources: resources,
    private httpService: httpService, private elementRef: ElementRef,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }

  ngOnInit() {
    this.loadResources();
    this.getWeddingAndPartnerDetails();
  }

  saveWeddingAndPartnerDetails(){
    this.ngxSpinner.show();
    let dateValue: any = document.getElementById("date-picker");
    this.weddingDetails.weddingDate = dateValue.value;
    let updateWeddingAndPartnerURL = `${urls.UPDATE_WEDDING_AND_PARTNER_DETAILS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.httpService.Post(updateWeddingAndPartnerURL , {} , { "weddingAndPartnerData" : this.weddingDetails }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.getWeddingAndPartnerDetails();
        this.toastr.success("Changes has been saved.", "Your details has been updated! 😍");
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Changes has been saved." , "My bad, server couldn't update your data.");
      }
    });
  };


  getWeddingAndPartnerDetails(){
    this.ngxSpinner.show();
    let getWeddingAndPartnerURL = `${urls.GET_WEDDING_AND_PARTNER_DETAILS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.httpService.Get(getWeddingAndPartnerURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.weddingDetails = response.data as weddingDetials;
        console.log(this.weddingDetails)
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
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
      constants.VIEWS["WEDDING_DETAILS"]
    )) as any;
    this.labels = resData.res;

  };


  //#region Scripts Methods Helpers
  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  //#endregion
}
