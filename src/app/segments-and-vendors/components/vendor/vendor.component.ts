import { urls, localStorageService, constants, httpService, post, responseModel, vendor , socialSharing, comment } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  isAuthed: boolean;
  vendorId: any;
  currentUserEmail: string;

  telRef: any;
  mailTo: any;
  userComment = new comment();
  allComments: comment[] = [];
  vendor = new vendor();
  facebookURL: string;
  pinterestURL: string;
  instagramURL: string;
  twitterURL: string;
  htmlView: any;


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
    this.checkLoginStatus();
    this.getAllComments();
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

        console.log(this.vendor)
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    });
  };



  //#region User Helpers..
  rate(rateValue , rateCriteria){
    console.log(rateValue , rateCriteria)
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
    // let scripts = ['assets/scripts/custom.js'];

    // scripts.forEach(element => {
    //   const s = this.document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = element;
    //   this.elementRef.nativeElement.appendChild(s);
    // });
  };
  //#endregion
}
