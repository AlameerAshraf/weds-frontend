import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MapsAPILoader } from "@agm/core";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  ElementRef,
  NgZone,
  ViewChild,
} from "@angular/core";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
//import { } from '@types/googlemaps';
declare const google: any;

@Component({
  selector: "app-vendors-form",
  templateUrl: "./vendors-form.component.html",
  styleUrls: ["./vendors-form.component.scss"],
})
export class VendorsFormComponent implements OnInit {
  is = false;
  coverPhotoSource: any = "";

  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  @ViewChild("search", { static: true }) public searchElementRef: ElementRef;

  files: File[] = [];
  lang: string;
  labels: any = {};
  private geoCoder: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private resources: resources,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.loadResources();
  }

  ngOnInit() {
    this.mapsLoader();
  }
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
      constants.VIEWS["VENDORS"]
    )) as any;
    this.labels = resData.res;
  }
  createNewCheckList() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success("Hello world!", "Toastr fun!");
      this.router.navigateByUrl(
        `/profile/${this.lang}/vendor/checklist-defaults`
      );
    }, 3000);
  }

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/vendor/vendors-list`);
  }

  selectTemplate(e: any) {
    e.preventDefault();
    this.is = !this.is;
    let like = document.getElementById("template1");
    if (!this.is) {
      like.classList.add("liked");
    } else {
      like.classList.remove("liked");
    }
  }

  onFileSelected(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return (this.coverPhotoSource = fileReader.result);
      };
      fileReader.readAsDataURL(imageFile);
    }
  }

  mapsLoader() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
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
  }

  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd(e: any) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  createNewWebsiteRequest() {}

  ngAfterViewInit(): void {
    let scripts = [
      "assets/scripts/datePickerInitakizer.js",
      "assets/scripts/custom.js",
      "assets/scripts/dropzone.js",
    ];

    scripts.forEach((element) => {
      const s = this.document.createElement("script");
      s.type = "text/javascript";
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  }
}
