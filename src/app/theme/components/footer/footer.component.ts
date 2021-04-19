import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "weds-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentDate = new Date().getFullYear();
  lang: string;
  labels: any = {};
  constructor(
    private resources: resources,
    private actictedRoute: ActivatedRoute
  ) {
    this.loadResources();
  }

  ngOnInit() {}

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;

    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["HOME_LAYOUT"]
    )) as any;

    if (!resData.error) {
      this.labels = resData.res;
    }
  }
}
