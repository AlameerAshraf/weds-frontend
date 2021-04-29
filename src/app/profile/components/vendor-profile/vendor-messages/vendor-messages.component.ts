import { Component, OnInit } from '@angular/core';
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-vendor-messages',
  templateUrl: './vendor-messages.component.html',
  styleUrls: ['./vendor-messages.component.scss']
})
export class VendorMessagesComponent implements OnInit {

  lang: string;
  labels: any = {};
  constructor(private resources: resources) {

  }

  ngOnInit() {
    this.loadResources();
  }
  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    // alert(this.lang);
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["MESSAGES"]
    )) as any;
    this.labels = resData.res;
  }

}
