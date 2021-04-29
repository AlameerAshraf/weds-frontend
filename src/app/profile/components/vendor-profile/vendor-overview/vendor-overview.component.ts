import { Component, OnInit } from '@angular/core';
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-vendor-overview',
  templateUrl: './vendor-overview.component.html',
  styleUrls: ['./vendor-overview.component.scss']
})
export class VendorOverviewComponent implements OnInit {
  lang: string;
  labels: any = {};
  confirmAccount: string;
  constructor(private resources: resources) {
    this.loadResources();
  }

  ngOnInit() { }
  formatRequiredFieldToHTML() {
    const label = this.labels.EMAIL_SENT;
    const labelArr = label.split("-", 2);
    this.confirmAccount = `${labelArr[0] || ""} <strong class="text-maranth">${labelArr[1]
      } </strong>  `;
    //we've sent you an email confirmation <strong>Confirm your account</strong> now!</p>
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

}
