import { Component, OnInit } from '@angular/core';
import { constants, httpService, resources } from 'src/app/core';
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
  constructor(private resources: resources, private http: httpService) { this.loadResources() }

  ngOnInit() {
  }
  async loadResources() {
    let lang = window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang = lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["SEGMENTS_SERVICE"]) as any;;
    this.labels = resData.res;
  };
}
