import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-messages",
  templateUrl: "./admin-messages.component.html",
  styleUrls: ["./admin-messages.component.scss"],
})
export class AdminMessagesComponent implements OnInit, AfterViewInit {
  lang: string;
  labels: any = {};
  constructor(
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private resources: resources
  ) {
    this.loadResources();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    let scripts = ["assets/scripts/custom.js"];

    scripts.forEach((element) => {
      const s = this.document.createElement("script");
      s.type = "text/javascript";
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
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
      constants.VIEWS["MESSAGES"]
    )) as any;
    this.labels = resData.res;
  }
}
