import { Router } from '@angular/router';
import { localStorageService, weddingWebsite, httpService, urls, constants, responseModel, theme, resources } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.scss']
})
export class SiteStatusComponent implements OnInit {
  weddingWebsite: weddingWebsite = {
    coverImage: "assets/images/defaults/wedding/cover-photo.png",
    location: {
      venue: "",
      address: "",
      latitude: 0,
      longtitude: 0,
    }
  }
  currentUserEmail: string;
  baseThemeRouting: any;
  labels: any = {};
  lang: string;
  constructor(private localStorageService: localStorageService, private httpService: httpService, private resources: resources) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.getWebSiteStaus();
    this.getThemeRoutingDetails();
    this.loadResources();
  }

  getWebSiteStaus() {
    ;
    this.weddingWebsite = this.localStorageService.getLocalStorage("weds360#mysite");
  };

  getThemeRoutingDetails() {
    let themeURL = `${urls.GET_THEME_DETAILS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?theme=${this.weddingWebsite.themeId}`;
    this.httpService.Get(themeURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.baseThemeRouting = (response.data[0] as theme).url;
      }
    })
  };

  previewSite() {
    window.open(`/sites/en/${this.baseThemeRouting}?me=${this.weddingWebsite.routeURL}`);
  };
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
      constants.VIEWS["WEDDING_WEBSITE"]
    )) as any;
    this.labels = resData.res;
  };
}
