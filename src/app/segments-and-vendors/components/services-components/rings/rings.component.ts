import { Component, OnInit } from '@angular/core';
import { constants, httpService, resources, responseModel, urls } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rings',
  templateUrl: './rings.component.html',
  styleUrls: ['./rings.component.scss']
})
export class RingsComponent implements OnInit {

  //labels
  labels: any = {};
  lang: string;
  allCategories = [];
  allAreas = [];

  constructor(private resources: resources, private http: httpService) { this.loadResources() }

  ngOnInit() {
    //  this.getAllCategories();
    this.getAllAreas();
  }

  getAllAreas() {
    let allAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allAreasURL, {}).subscribe((response: responseModel) => {

      if (!response.error) {
        this.allAreas = response.data;

      } else {
        console.log(response.error);
      }
    });
  };
  getAllCategories() {
    let allCatesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allCatesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allCategories = response.data;
      } else {
        console.log(response.error);
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
