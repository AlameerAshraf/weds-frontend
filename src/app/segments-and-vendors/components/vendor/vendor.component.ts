import { urls, localStorageService, constants, httpService, post, responseModel, vendor } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  isAuthed: boolean;
  vendorId: any;
  currentUserEmail: string;

  telRef;
  vendor = new vendor();


  constructor(@Inject(DOCUMENT) private document: any, private ActivatedRoute: ActivatedRoute,
    private toaster: ToastrService, private spineer: NgxSpinnerService, private httpService: httpService,
    private elementRef: ElementRef, private localStorage: localStorageService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

      this.ActivatedRoute.params.subscribe((params) => {
        this.vendorId = params["vendorId"];
        this.loadVendorData(this.vendorId);
      });
    }

  ngOnInit() {
    this.checkLoginStatus();
  }

  loadVendorData(id: any){
    this.spineer.show();

    let getVendorByIdURL = `${urls.GET_VENDOR_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.httpService.Post(getVendorByIdURL , { "vendorId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spineer.hide();
        this.vendor = response.data as vendor;
        this.telRef = `tel:${this.vendor.phone}`
      }else{
        this.spineer.hide();
        this.toaster.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    });
  };


  //#region Helper methods
  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
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
