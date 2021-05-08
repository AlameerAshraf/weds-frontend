import { urls, localStorageService, constants, httpService, post, responseModel, vendor, socialSharing, comment, transporter } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit, AfterViewInit {
  isAuthed: boolean;

  vendor = new vendor();
  vendorId: any;
  currentUserEmail: string;

  telRef: any;
  mailTo: any;

  facebookURL: string;
  pinterestURL: string;
  instagramURL: string;
  twitterURL: string;
  htmlView: any;

  userComment = new comment();
  allComments: comment[] = [];

  userRank: { user?: string, criteria?: string, value?: number, userEmail?: string } = {};
  locationRankValues: string;
  serviceRankValues: string;
  valueForMoneyRankValues: string;


  constructor(@Inject(DOCUMENT) private document: any, private ActivatedRoute: ActivatedRoute,
    private toaster: ToastrService, private spineer: NgxSpinnerService, private httpService: httpService,
    private elementRef: ElementRef, private localStorage: localStorageService , private _sanitizer: DomSanitizer) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

      this.ActivatedRoute.params.subscribe((params) => {
        this.vendorId = params["vendorId"];
        this.loadVendorData(this.vendorId);
      });
    }

  ngOnInit() {
    this.getAllComments();
    this.checkLoginStatus();
    this.loadScripts();
  }

  loadVendorData(id: any){
    this.spineer.show();

    let getVendorByIdURL = `${urls.GET_VENDOR_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.httpService.Post(getVendorByIdURL , { "vendorId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spineer.hide();
        this.vendor = response.data as vendor;
        this.telRef = `tel:${this.vendor.phone}`;
        this.mailTo = `mailto:${this.vendor.email}`;

        this.facebookURL = this.vendor.social.find(x => x.includes('facebook'));
        this.instagramURL = this.vendor.social.find(x => x.includes('instagram'));
        this.pinterestURL = this.vendor.social.find(x => x.includes('pinterest'));
        this.twitterURL = this.vendor.social.find(x => x.includes('twitter'));

        this.htmlView = this._sanitizer.bypassSecurityTrustHtml(this.vendor.descriptionURLAr);
        this.vendor.avatar = this.vendor.avatar == undefined ? 'assets/images/defaults/avatar/vendor.png' : this.vendor.avatar;
        this.bindCurrentUserRate(this.vendor.ranks);
        this.viewAggregatedVendorRate(this.vendor.ranks);
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    });
  };


  //#region  Vendor helpers..
  viewAggregatedVendorRate(vendorRates: { user?: string, criteria?: string, value?: number, userEmail?: string }[]){
    let counter = 0;
    let aggregatedTotalRank = 0;

    let locationRanks = 0;
    let locationNumberOfRates = 0;

    let serviceRanks = 0;
    let serviceNumberOfRates = 0;

    let valueForMoneyRanks = 0;
    let valueForMoneyNumberOfRates = 0;

    vendorRates.forEach((rank) => {
      counter = counter + rank.value;
      if(rank.criteria == "LOCATION"){
        locationNumberOfRates = locationNumberOfRates + 1;
        locationRanks = locationRanks + rank.value;
      }

      if(rank.criteria == "SERVICE"){
        serviceNumberOfRates = locationNumberOfRates + 1;
        serviceRanks = serviceRanks + rank.value;
      }

      if(rank.criteria == "VALUE_FOR_MONEY"){
        valueForMoneyNumberOfRates = valueForMoneyNumberOfRates + 1;
        valueForMoneyRanks = valueForMoneyRanks + rank.value;
      }
    });


    let locationRates = vendorRates.filter((rank) => {
      return rank.criteria == "LOCATION"
    });

    aggregatedTotalRank = Math.ceil(Number(counter) / Number(vendorRates.length));
    this.locationRankValues = (Number(locationRanks) / Number(locationNumberOfRates)).toFixed(1);
    this.serviceRankValues = (Number(serviceRanks) / Number(serviceNumberOfRates)).toFixed(1);
    this.valueForMoneyRankValues = (Number(valueForMoneyRanks) / Number(valueForMoneyNumberOfRates)).toFixed(1);

    let htmlElementAggrgated = document.getElementById(`star${aggregatedTotalRank}-agg`) as any;
    let htmlElementTotals = document.getElementById(`star${aggregatedTotalRank}-totals`) as any;

    htmlElementAggrgated.checked = true;
    htmlElementTotals.checked = true;
  };
  //#endregion

  //#region User Helpers..
  // This to bind the actual current loggen in user rates!
  bindCurrentUserRate(vendorRates: { user?: string, criteria?: string, value?: number, userEmail?: string }[]){
    let map = {
      5: 1,
      4: 2,
      3: 3,
      2: 4,
      1: 5
    };

    let myRates = vendorRates.filter((rate) => {
      return rate.userEmail == this.currentUserEmail;
    });
    myRates.forEach((rate) => {
      let starLocation = map[rate.value]
      let starElement = `${rate.criteria}-${starLocation}`;
      let htmlElement = document.querySelector(`[rate-map="${starElement}"]`) as any;

      console.log(htmlElement)
      htmlElement.checked = true;
    })
  };

  rate(rateValue , rateCriteria){
    this.userRank = {
      criteria: rateCriteria,
      value: rateValue,
      userEmail: this.currentUserEmail
    };

    let rateURL = `${urls.RATE_VENDOR}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?vendorId=${this.vendorId}`;
    this.httpService.Post(rateURL , {} , { "rank" : this.userRank }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spineer.hide();
        this.getAllComments();
        this.toaster.success("Gooood!" , `Thanks your rate has been saved, it will help people know ${this.vendor.nameEn} well! ⭐`);
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, Server couldn't save your rate, try again later.");
      }
    })
  };

  comment(){
    this.userComment.userEmail = this.currentUserEmail;
    let commentURL = `${urls.CREATE_NEW_COMMENT}/${constants.APP_IDENTITY_FOR_USERS}/${this.vendorId}`;
    this.httpService.Post(commentURL , {} , { "comment" : this.userComment }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spineer.hide();
        this.getAllComments();
        this.toaster.success("Gooood!" , `You review has been added, it will help people know ${this.vendor.nameEn} well! ❤`);
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, Server couldn't create your comment, try again later.");
      }
    });
  };

  getAllComments(){
    let getAllCommnetsURL = `${urls.GET_ALL_COMMENTS}/${constants.APP_IDENTITY_FOR_USERS}/${this.vendorId}`;
    this.httpService.Get(getAllCommnetsURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.spineer.hide();
        this.allComments = response.data as comment[];
        this.allComments.forEach((aComment) => {
          aComment.date = new Date(aComment.date).toDateString();
          aComment.userAvatar = aComment.gender == "Female" ? 'assets/images/defaults/avatar/bride.png' : 'assets/images/defaults/avatar/groom.png';
        });
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, Server couldn't load vendor comments.");
      }
    })
  }
  //#endregion

  //#region Helper methods
  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };

  openLink(url){
    window.open(url);
  };

  share(type , url){
    socialSharing.createNavigationUrl(type , url);
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
  }
  //#endregion
}
