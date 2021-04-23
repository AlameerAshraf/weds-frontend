import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import {
  constants,
  httpService,
  localStorageService,
  resources,
} from "src/app/core";
import { environment } from "src/environments/environment";
declare var $: any;

declare var $: any;

@Component({
  selector: "app-services-ring-form",
  templateUrl: "./services-ring-form.component.html",
  styleUrls: ["./services-ring-form.component.scss"],
})
export class ServicesRingFormComponent implements OnInit {
  selectedLayout = "";
  lang: string;
  labels: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private resources: resources,
    private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService,
    private http: httpService
  ) {
    this.loadResources();
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  gOnInit() {
    this.loadScripts();
  }

  selectTemplate(template) {
    if (this.selectedLayout == template) this.selectedLayout = "";
    else this.selectedLayout = template;
  }

  addNewServiceTemplate() {
    //TODO: Add new service template!
    alert("this feature not implamented yet");
  }

  //#region Script loaders Helpers..
  ngAfterViewInit(): void {
    this.loadScripts();
  }

  loadScripts() {
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
