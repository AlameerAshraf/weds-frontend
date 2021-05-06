import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants, featureCount, responseModel, urls, httpService,resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web-site-admin-view',
  templateUrl: './web-site-admin-view.component.html',
  styleUrls: ['./web-site-admin-view.component.scss']
})
export class WebSiteAdminViewComponent implements OnInit {

  featuresCount = new featureCount();
  currentUserEmail;
  lang: string;
  labels: any = {};
  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router, private http: httpService, private resources: resources,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.getAllWebsiteFeaturesCount();
    this.loadResources();
  }

  getAllWebsiteFeaturesCount() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_FEATURES_COUNT}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.featuresCount = response.data as featureCount;
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  navigate(url) {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/${url}`)
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
      constants.VIEWS["WEBSITE_ADMIN"]
    )) as any;
    this.labels = resData.res;
  }
}
