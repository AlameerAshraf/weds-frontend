import { Component, OnInit } from '@angular/core';
import { constants, httpService, localStorageService, resources, vendorService } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-single-dress',
  templateUrl: './single-dress.component.html',
  styleUrls: ['./single-dress.component.scss']
})
export class SingleDressComponent implements OnInit {
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

  openVendor(vendorId: any) {
    window.open(`/segment/en/vendor/${vendorId}`);
  };

  async loadResources() {
    let lang = window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang = lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["SEGMENTS_SERVICE"]) as any;;
    this.labels = resData.res;
  };
}
