import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-services-form",
  templateUrl: "./services-form.component.html",
  styleUrls: ["./services-form.component.scss"],
})
export class ServicesFormComponent implements OnInit {
  currentService = "ring";
  lang: string;
  labels: any = {};
  constructor(private router: Router, private resources: resources) {
    this.loadResources();
  }

  ngOnInit() {}
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
      constants.VIEWS["SERVICES"]
    )) as any;
    this.labels = resData.res;
  }
  navigateToCreateNewDress() {
    this.router.navigate([
      `profile/${this.lang}/admin/services-dress-action/new`,
    ]);
    `
  navigateToCreateNewRing(`;
    this.router.navigate([
      `profile/${this.lang}/admin/services-ring-action/new`,
    ]);
  }

  addNewServiceTemplate() {
    alert("this feature not implemented yet");
  }
}
