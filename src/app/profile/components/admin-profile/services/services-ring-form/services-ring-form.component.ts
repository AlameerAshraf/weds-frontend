import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  ElementRef,
  NgZone,
  ViewChild,
} from "@angular/core";
import { constants, resources } from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-services-ring-form",
  templateUrl: "./services-ring-form.component.html",
  styleUrls: ["./services-ring-form.component.scss"],
})
export class ServicesRingFormComponent implements OnInit {
  coverPhotoSource = "";
  lang: string;
  labels: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private resources: resources
  ) {
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
  navigateToServicesForm() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success("Hello world!", "Toastr fun!");
      this.router.navigateByUrl("/profile/en/admin/services-action/new");
    }, 3000);
  }

  backToRoute() {
    this.router.navigateByUrl("/profile/en/admin/services-action/new");
  }
}
