import { NgxSpinnerService } from "ngx-spinner";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DOCUMENT } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import {
  tag,
  constants,
  urls,
  httpService,
  responseModel,
  localStorageService,
  resources,
} from "src/app/core";
import { environment } from "src/environments/environment.prod";
declare var $: any;

@Component({
  selector: "app-tags-form",
  templateUrl: "./tags-form.component.html",
  styleUrls: ["./tags-form.component.scss"],
})
export class TagsFormComponent implements OnInit, AfterViewInit {
  editingMode = "new";
  that = this;

  currentUserEmail: string;
  tag: tag = {
    description: "desc",
    nameEn: "",
    nameAr: "",
    name: "",
    isRemoved: false,
    isEnabled: true,
    langauge: "En",
  };
  lang: string;
  labels: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private resources: resources,

    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private storage: localStorageService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private ngxSpinner: NgxSpinnerService,
    private http: httpService
  ) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {
    this.loadResources();
    this.loadScripts();
    this.initTagView();
  }

  initTagView() {
    if (this.editingMode == "update") {
      this.tag = this.storage.getLocalStorage("weds360#tagOnEdit");
    }
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
      constants.VIEWS["TAGS"]
    )) as any;
    this.labels = resData.res;
  }

  createNewEntity() {
    this.ngxSpinner.show();

    let createURL = `${urls.CREATE_TAG}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.tag.langauge = "En";
    this.tag.name = this.tag.nameEn;
    this.http
      .Post(createURL, {}, { tag: this.tag })
      .subscribe((response: responseModel) => {
        if (!response.error) {
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your tag couldn't created on the server!"
          );
        }
      });

    this.tag.name = this.tag.nameAr;
    this.tag.langauge = "Ar";
    this.http
      .Post(createURL, {}, { tag: this.tag })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Tag has been saved succesfully",
            "Tag has been updated, Bingo!"
          );
          this.router.navigateByUrl(
            `/profile/${this.lang}/admin/tags-defaults`
          );
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your tag couldn't created on the server!"
          );
        }
      });
  }

  updateExistingEntity() {
    this.ngxSpinner.show();

    let updateURL = `${urls.UPDATE_TAG}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.tag._id}`;
    this.http
      .Post(updateURL, {}, { tag: this.tag })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Tag has been saved succesfully",
            "A new tag has been updated and wedding website will be impacted."
          );
          this.router.navigateByUrl(
            `/profile/${this.lang}/admin/tags-defaults`
          );
        } else {
          console.log(response);
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your tag couldn't created on the server!"
          );
        }
      });
  }

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/tags-defaults`);
  }

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
}
