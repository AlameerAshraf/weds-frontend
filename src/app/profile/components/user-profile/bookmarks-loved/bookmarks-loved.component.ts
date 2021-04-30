import { Component, OnInit } from '@angular/core';
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-bookmarks-loved',
  templateUrl: './bookmarks-loved.component.html',
  styleUrls: ['./bookmarks-loved.component.scss']
})
export class BookmarksLovedComponent implements OnInit {

  lang: string;
  labels: any = {};
  confirmAccount: string;
  constructor(private resources: resources) {
    this.loadResources();
  }

  ngOnInit() { }

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
      constants.VIEWS["BOOKMARKS"]
    )) as any;
    this.labels = resData.res;
  }
}
