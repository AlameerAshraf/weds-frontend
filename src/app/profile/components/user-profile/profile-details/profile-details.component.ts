import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, responseModel, urls,resources } from 'src/app/core';

import { environment } from 'src/environments/environment';
declare const google: any
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, AfterViewInit {
  coverPhotoSource: string | ArrayBuffer = ''
  latitude: number;
  longitude: number;
  zoom: number = 12;
  profilePhotoUrl:string ='http://via.placeholder.com/1920x315'
  private geoCoder: any;
  address: any = "";
  currentUserEmail: string;
  labels:any={};
  lang:string;
  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService , private resources: resources,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }

  ngOnInit() {
     this.setCurrentLocation();
    this.loadUser();
    this.loadResources();
  };

  loadUser(){
    let loadUserURL = `${urls.GET_USER_DATA}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(loadUserURL , { "role" : atob(window.localStorage.getItem("weds360#role")) }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        console.log(response)
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    });
  };

  onFileSelected(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return this.coverPhotoSource = fileReader.result;
      };
      fileReader.readAsDataURL(imageFile);
    }
  };


  //#region Adress Helper..
  markerDragEnd(e){

  };

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude , this.longitude);
      });
    }
  };

  getAddress(latitude: number, longitude: number) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
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
