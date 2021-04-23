import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-web-site-admin-view",
  templateUrl: "./web-site-admin-view.component.html",
  styleUrls: ["./web-site-admin-view.component.scss"],
})
export class WebSiteAdminViewComponent implements OnInit {
  lang: string;
  labels: any = {};
  constructor(private router: Router, private resources: resources) {
    this.loadResources();
  }

  ngOnInit() {}

  navigate(url) {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/${url}`);
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
      constants.VIEWS["WEBSITE_ADMIN"]
    )) as any;
    this.labels = resData.res;
  }
}
