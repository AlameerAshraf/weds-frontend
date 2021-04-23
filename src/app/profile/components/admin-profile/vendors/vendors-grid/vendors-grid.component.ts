import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-vendors-grid",
  templateUrl: "./vendors-grid.component.html",
  styleUrls: ["./vendors-grid.component.scss"],
})
export class VendorsGridComponent implements OnInit {
  lang: string;
  labels: any = {};
  constructor(private router: Router, private resources: resources) {
    this.loadResources();
  }

  ngOnInit() {}
  pageChange(pageNumber) {}

  navigateToCreateNewVendor() {
    this.router.navigate([`profile/${this.lang}/admin/vendors-action/new`]);
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
      constants.VIEWS["VENDORS"]
    )) as any;
    this.labels = resData.res;
  }
}
