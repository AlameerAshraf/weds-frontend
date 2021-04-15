import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
//import { } from '@types/googlemaps';
declare const google: any
declare var $

@Component({
  selector: 'app-vendor-profile-details',
  templateUrl: './vendor-profile-details.component.html',
  styleUrls: ['./vendor-profile-details.component.scss']
})
export class VendorProfileDetailsComponent implements OnInit {
  is = false;
  coverPhotoSource: any = '';

  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  tagsAr;
  that = this;

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  files: File[] = [];

  private geoCoder: any;


  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService,@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsLoader();
    this.documentSelectors();
  };

  // Editors as advanced descriptions from posts page.
  // Add multi selectors for tags ar, en
  // Load all tags bind to multi selector.
  //

  documentSelectors(){
    $("#tagsAr").change({ angularThis: this.that } ,function(e, params){
      var suggestedBudgetElement: any = document.getElementById("suggestedBudget");

      e.data.angularThis.tagsAr = $("#tagsAr").chosen().val();
    });
  };


  //#region Maps Helpers..
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

  mapsLoader(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  };

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  };

  markerDragEnd(e: any){
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  };

  getAddress(latitude: number, longitude: number) {
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

  //#region  Scripts Loading helpers..
  ngAfterViewInit(): void {
    this.loadScripts();
  };


  loadScripts(){
    let scripts = ['assets/scripts/datePickerInitakizer.js', 'assets/scripts/custom.js' , 'assets/scripts/dropzone.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

  //#endregion
}
