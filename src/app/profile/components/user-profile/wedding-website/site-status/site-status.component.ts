import { Router } from '@angular/router';
import { localStorageService, weddingWebsite, httpService, urls, constants, responseModel, theme } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.scss']
})
export class SiteStatusComponent implements OnInit {
  weddingWebsite: weddingWebsite = {
    coverImage : "assets/images/defaults/wedding/cover-photo.png",
    location: {
      venue: "",
      address: "",
      latitude: 0,
      longtitude: 0,
    }
  }
  currentUserEmail: string;
  baseThemeRouting: any;

  constructor(private localStorageService: localStorageService, private httpService: httpService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.getWebSiteStaus();
    this.getThemeRoutingDetails();
  }

  getWebSiteStaus(){;
    this.weddingWebsite = this.localStorageService.getLocalStorage("weds360#mysite");
  };

  getThemeRoutingDetails(){
    let themeURL = `${urls.GET_THEME_DETAILS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?theme=${this.weddingWebsite.themeId}`;
    this.httpService.Get(themeURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.baseThemeRouting = (response.data[0] as theme).url;
      }
    })
  };

  previewSite(){
    window.open(`/sites/en/${this.baseThemeRouting}?me=${this.weddingWebsite.routeURL}`);
  };
}
