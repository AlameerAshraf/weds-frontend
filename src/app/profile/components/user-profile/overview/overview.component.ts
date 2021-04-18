import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  lang: string;
  labels: any = {};
  confirmAccount: string;
  constructor(private resources: resources, private route: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {}
  formatRequiredFieldToHTML() {
    debugger;
    const label = this.labels.EMAIL_SENT;
    const labelArr = label.split("-", 2);
    this.confirmAccount = `${labelArr[0] || ""} <strong class="text-maranth">${
      labelArr[1]
    } </strong>  `;
    //we've sent you an email confirmation <strong>Confirm your account</strong> now!</p>
  }
  async loadResources() {
    debugger;
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
      constants.VIEWS["OVERVIEW"]
    )) as any;
    this.labels = resData.res;
    this.formatRequiredFieldToHTML();
  }
}
