import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DOCUMENT } from "@angular/common";
import {
  theme,
  constants,
  urls,
  httpService,
  resources,
  responseModel,
  localStorageService,
} from "src/app/core";
import { environment } from "src/environments/environment";
declare var $: any;

@Component({
  selector: "app-themes-form",
  templateUrl: "./themes-form.component.html",
  styleUrls: ["./themes-form.component.scss"],
})
export class ThemesFormComponent implements OnInit, AfterViewInit {
  editingMode = "new";
  that = this;
  layoutRouting = "";

  currentUserEmail: string;
  themesLayoutLocations = constants.THEMES;
  theme: theme = {
    image: "assets/images/defaults/wedding/cover-photo.png",
    name: "",
    url: "",
  };
  lang: string;
  labels: any = {};

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private http: httpService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private resources: resources,

    private storage: localStorageService,
    private ngxSpinner: NgxSpinnerService
  ) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.loadResources();
    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {
    this.loadScripts();
    this.initThemeView();
    this.documentSelectors();
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
      constants.VIEWS["THEMES"]
    )) as any;
    this.labels = resData.res;
  }
  initThemeView() {
    if (this.editingMode == "update") {
      this.theme = this.storage.getLocalStorage("weds360#themeOnEdit");
    }
  }

  createNewEntity() {
    this.ngxSpinner.show();
    this.theme.url = this.layoutRouting;

    let createURL = `${urls.CREATE_THEME}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http
      .Post(createURL, {}, { theme: this.theme })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Theme has been saved succesfully",
            "Theme has been updated, Bingo!"
          );
          this.router.navigateByUrl(
            `/profile/${this.lang}/admin/themes-defaults`
          );
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your theme couldn't created on the server!"
          );
        }
      });
  }

  updateExistingEntity() {
    this.ngxSpinner.show();
    this.theme.url =
      this.layoutRouting == "" ? this.theme.url : this.layoutRouting;

    let updateURL = `${urls.UPDATE_THEME}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http
      .Post(updateURL, {}, { theme: this.theme })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Theme has been saved succesfully",
            "A new theme has been created and wedding website will be impacted."
          );
          this.router.navigateByUrl(
            `/profile/${this.lang}/admin/themes-defaults`
          );
        } else {
          console.log(response);
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your theme couldn't created on the server!"
          );
        }
      });
  }

  navigateToThemesDefaults() {}

  uploadImage(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["THEMES"]);
      formData.append("isSlefAssigned", "false");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http
        .Post(uploadImageURL, {}, formData)
        .subscribe((response: responseModel) => {
          if (!response.error) {
            this.ngxSpinner.hide();
            this.theme.image = response.data;
          } else {
            this.ngxSpinner.hide();
          }
        });
    }
  }

  documentSelectors() {
    $("#themesLayouts").change(
      { angularThis: this.that },
      function (e, params) {
        e.data.angularThis.layoutRouting = $("#themesLayouts").chosen().val();
      }
    );
  }

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/themes-defaults`);
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
