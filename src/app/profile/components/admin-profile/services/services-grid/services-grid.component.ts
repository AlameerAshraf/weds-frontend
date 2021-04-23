import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-services-grid",
  templateUrl: "./services-grid.component.html",
  styleUrls: ["./services-grid.component.scss"],
})
export class ServicesGridComponent implements OnInit {
  constructor(private router: Router, private resources: resources) {
    this.loadResources();
  }
  servicesList: any = [];
  lang: string;
  labels: any = {};
  ngOnInit() {}

  pageChange(pageNumber) {}

  navigateToCreateNewService() {
    this.router.navigate([`profile/${this.lang}/admin/services-action/new`]);
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
      constants.VIEWS["SERVICES"]
    )) as any;
    this.labels = resData.res;
  }
}
