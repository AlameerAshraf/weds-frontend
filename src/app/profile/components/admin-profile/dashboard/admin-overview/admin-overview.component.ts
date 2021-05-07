import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { constants, featureCount, responseModel, urls, httpService, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit, AfterViewInit {
  lang: string;
  labels: any = {};
  confirmAccount: string;
  currentUserEmail: string;
  currentUserName: string;
  featuresCount = new featureCount();
  isConfirmed: string = "false";
  upcommingSessionsList: any[] = [];
  notificationsList: any[] = [];
  
  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef,
    private router: Router, private http: httpService, private resources: resources,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.currentUserName = window.localStorage.getItem("weds360#name");
  }
  ngOnInit() {
    this.getAllWebsiteFeaturesCount();
    this.loadResources();
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

  formatRequiredFieldToHTML() {
    this.isConfirmed = window.localStorage.getItem("weds360#isConfirmed") != undefined ?
      atob(window.localStorage.getItem("weds360#isConfirmed")) : "false";
    console.log(this.isConfirmed)

    if (this.isConfirmed == "true") {
      const label = this.labels.EMAIL_CONFIRMED;
      this.confirmAccount = `${label}`;
    }
    else {
      const label = this.labels.EMAIL_SENT;
      const labelArr = label.split("-", 2);
      this.confirmAccount = `${labelArr[0] || ""} <strong class="text-maranth">${
        labelArr[1]
        } </strong>  `;
    }

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
      constants.VIEWS["OVERVIEW"]
    )) as any;
    this.labels = resData.res;
    this.formatRequiredFieldToHTML();
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

}
