import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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

@Component({
  selector: "app-services-form",
  templateUrl: "./services-form.component.html",
  styleUrls: ["./services-form.component.scss"],
})
export class ServicesFormComponent implements OnInit {
  currentService = "ring";
  lang: string;
  labels: any = {};
  selectedLayout = "";

  constructor(
    private router: Router,
    private resources: resources,
    @Inject(DOCUMENT) private document: any,
    private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService,
    private elementRef: ElementRef,
    private http: httpService,
    private toastr: ToastrService,
    private actictedRoute: ActivatedRoute
  ) {
    this.loadResources();
  }

  ngOnInit() {
    this.loadScripts();
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

  selectTemplate(template) {
    if (this.selectedLayout == template) this.selectedLayout = "";
    else this.selectedLayout = template;
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

  addNewServiceTemplate() {
    alert("this feature not implemented yet");
  }
}
