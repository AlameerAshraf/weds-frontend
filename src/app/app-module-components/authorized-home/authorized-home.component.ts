import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { constants, resources } from "src/app/core";
import { environment } from "../../../environments/environment";
import { httpService } from "./../../core/services/http/http";

@Component({
  selector: "app-authorized-home",
  templateUrl: "./authorized-home.component.html",
  styleUrls: ["./authorized-home.component.scss"],
})
export class AuthorizedHomeComponent implements OnInit {
  labels: any = {};
  lang: string;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute
  ) {}

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
