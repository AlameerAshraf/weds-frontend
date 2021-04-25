import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants, featureCount, responseModel, urls, httpService } from 'src/app/core';

@Component({
  selector: 'app-user-admin-view',
  templateUrl: './user-admin-view.component.html',
  styleUrls: ['./user-admin-view.component.scss']
})
export class UserAdminViewComponent implements OnInit {

  featuresCount = new featureCount();
  currentUserEmail;

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router, private http: httpService,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.getAllWebsiteFeaturesCount();
  }

  getAllWebsiteFeaturesCount() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_FEATURES_COUNT}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.featuresCount = response.data as featureCount;
        console.log(this.featuresCount.areasCount)
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  navigate(url) {
    this.router.navigateByUrl(`/profile/en/admin/${url}`)
  };
}
