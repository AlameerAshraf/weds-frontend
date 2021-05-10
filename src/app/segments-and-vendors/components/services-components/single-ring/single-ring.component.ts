import { Component, OnInit } from '@angular/core';
import { constants, httpService, localStorageService, resources, responseModel, urls, vendor, vendorService } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-single-ring',
  templateUrl: './single-ring.component.html',
  styleUrls: ['./single-ring.component.scss']
})
export class SingleRingComponent implements OnInit {

  //labels
  labels: any = {};
  lang: string;
  currentUserEmail: string;
  vendorName: string;

  dress = new vendorService();
  constructor(private resources: resources, private locatStorage: localStorageService,
     private http: httpService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.loadResources()
  }

  ngOnInit() {
    this.dress = this.locatStorage.getLocalStorage("weds360#dress");
    console.log(this.dress)
  }

  loadVendorData(id: any){
    let getVendorByIdURL = `${urls.GET_VENDOR_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(getVendorByIdURL , { "vendorId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.vendorName = (response.data as vendor).nameEn;
      }
    });
  };


  async loadResources() {
    let lang = window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang = lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["SEGMENTS_SERVICE"]) as any;;
    this.labels = resData.res;
  };
}
