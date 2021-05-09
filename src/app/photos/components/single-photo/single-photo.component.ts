import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, localStorageService, photo, responseModel, socialSharing, urls, vendor } from 'src/app/core';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  isAuthed: boolean = false;
  currentUserEmail: string;
  lang: any = "en";

  photo: photo = new photo();
  photoId: any;
  vendorName: any;

  constructor(private localStorage: localStorageService , private http: httpService,
    private ActivatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.ActivatedRoute.params.subscribe((params) => {
        this.photoId = params["photoId"];
        this.getSinglePhoto();
      })
    }

  ngOnInit() {
    this.checkLoginStatus();
  }

  share(type , url){
    socialSharing.createNavigationUrl(type , url);
  };

  getSinglePhoto(){
    this.spinner.show();
    let singlePhoto = `${urls.GET_SINGLE_PHOTO}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(singlePhoto, { "photoId" : this.photoId }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.photo = response.data[0] as photo;
        this.loadVendorData(this.photo.vendor);
      }
    })
  };

  openVendor(vendorId: any) {
    window.open(`/segment/en/vendor/${vendorId}`);
  };

  loadVendorData(id: any){
    let getVendorByIdURL = `${urls.GET_VENDOR_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(getVendorByIdURL , { "vendorId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.vendorName = (response.data as vendor).nameEn;
      }
    });
  };


  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
