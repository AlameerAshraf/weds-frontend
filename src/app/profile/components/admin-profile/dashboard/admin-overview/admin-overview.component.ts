import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from "@angular/core";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-overview",
  templateUrl: "./admin-overview.component.html",
  styleUrls: ["./admin-overview.component.scss"],
})
export class AdminOverviewComponent implements OnInit, AfterViewInit {
  lang: string;
  labels: any = {};
  confirmAccount: string;
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
  formatRequiredFieldToHTML() {
    const label = this.labels.EMAIL_SENT;
    const labelArr = label.split("-", 2);
    this.confirmAccount = `${labelArr[0] || ""} <strong class="text-maranth">${
      labelArr[1]
    } </strong>  `;
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
