import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { category, constants, urls, httpService, responseModel, localStorageService,resources } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {
  editingMode = "new";
  that = this;
  layout = "";
  parentMenu = "";

  currentUserEmail: string;
  categoriesSegments = constants.SEGMENTS;
  categoriesLayouts = constants.LAYOUTS;

  category: category = {
    nameEn: "",
    nameAr: "",
    isHidden: false,
    descriptionAr: "",
    descriptionEn: "",
    icon: "assets/images/defaults/wedding/cover-photo.png",
    isRemoved: false,
    layout: "",
    order: 0,
    parentMenu: "",
    photo: "assets/images/defaults/wedding/cover-photo.png",
    subDescriptionAr: "Sub EN",
    subDescriptionEn: "Sub Ar"
  };

  lang: string;
  labels: any = {};


  constructor(private ngxSpinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, @Inject(DOCUMENT) private document: any, private storage: localStorageService,  private resources: resources,
    private elementRef: ElementRef, private http: httpService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {
    this.loadScripts();
    this.initCategoryView();
    this.documentSelectors();
    this.loadResources();
  }

  initCategoryView() {
    if (this.editingMode == "update") {
      this.category = this.storage.getLocalStorage("weds360#categoryOnEdit");
    }
  };

  createNewEntity() {
    this.ngxSpinner.show();
    this.category.parentMenu = this.parentMenu;
    this.category.layout = this.layout;

    let createURL = `${urls.CREATE_CATEGORY}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL, {}, { "category": this.category }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("category has been saved succesfully", "category has been updated, Bingo!");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/categories-defaults`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your category couldn't created on the server!");
      }
    });
  };


  updateExistingEntity() {
    this.ngxSpinner.show();
    this.category.layout = this.layout == "" ? this.category.layout : this.layout;
    this.category.parentMenu = this.parentMenu == "" ? this.category.parentMenu : this.parentMenu;

    let updateURL = `${urls.UPDATE_CATEGORY}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.category._id}`;
    this.http.Post(updateURL, {}, { "category": this.category }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Category has been saved succesfully", "A new category has been updated and wedding website will be impacted.");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/categories-defaults`);
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your category couldn't created on the server!");
      }
    });
  };

  uploadImage(e: any, photoOrIcon): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      if (photoOrIcon == "photo")
        formData.append("targetEntity", constants.S3_CONTAINERS["CATEGORIES_IMAGES"]);
      else
        formData.append("targetEntity", constants.S3_CONTAINERS["CATEGORIES_ICONS"]);
      formData.append("isSlefAssigned", "false");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          if (photoOrIcon == "photo")
            this.category.photo = response.data;
          else
            this.category.icon = response.data;

        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };


  documentSelectors() {
    $("#categoriesLayouts").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.layout = $("#categoriesLayouts").chosen().val();
    });
    $("#categoriesSegments").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.parentMenu = $("#categoriesSegments").chosen().val();
    });
  };

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/categories-defaults`);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
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
      constants.VIEWS["CATEGORIES"]
    )) as any;
    this.lang = lang;

    this.labels = resData.res;
  }
}
