import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { photo, constants, urls, httpService, responseModel, localStorageService, resources, tag, category, vendor } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-photos-form',
  templateUrl: './photos-form.component.html',
  styleUrls: ['./photos-form.component.scss']
})
export class PhotosFormComponent implements OnInit {

  editingMode = "new";
  that = this;
  vendor = "";
  category = "";
  arTags = [];
  enTags = [];

  currentUserEmail: string;
  photo= new  photo();

  lang: string;
  labels: any = {};
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  categories: category[] = [];
  vendors: vendor[] = [];


  constructor(private ngxSpinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, @Inject(DOCUMENT) private document: any, private storage: localStorageService, private resources: resources,
    private elementRef: ElementRef, private http: httpService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }


  async ngOnInit() {
    let tempLookup = await this.getLookups();
    this.loadScripts();
    this.loadResources();
    this.initPhotoView();
    this.documentSelectors();
  }

  initPhotoView() {
    if (this.editingMode == "update") {
      this.photo = this.storage.getLocalStorage("weds360#photoOnEdit");
    }
  };

  async getLookups() {
    this.categories = this.storage.getLocalStorage("weds360#categories");
    this.tagsAr = this.storage.getLocalStorage("weds360#tagsAr");
    this.tagsEn = this.storage.getLocalStorage("weds360#tagsEn");
    this.vendors = this.storage.getLocalStorage("weds360#vendors");
  };

  createNewEntity() {
    this.ngxSpinner.show();

    let createURL = `${urls.CREATE_PHOTO}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL, {}, { "photo": this.photo }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("photo has been saved succesfully", "photo has been updated, Bingo!");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/photos-defaults`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your photo couldn't created on the server!");
      }
    });
  };


  updateExistingEntity() {
    this.ngxSpinner.show();

    let updateURL = `${urls.UPDATE_PHOTO}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(updateURL, {}, { "photo": this.photo }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Photo has been saved succesfully", "A new photo has been updated.");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/photos-defaults`);
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your photo couldn't created on the server!");
      }
    });
  };

  uploadImage(e: any, photoOrIcon): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["PHOTOS"]);
      formData.append("isSlefAssigned", "false");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.photo.image = response.data;

        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };


  documentSelectors() {
    $("#tagsAr").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsAr");

      e.data.angularThis.photo.tagAr = $("#tagsAr").chosen().val();
    });

    $("#tagsEn").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsEn");

      e.data.angularThis.photo.tagEn = $("#tagsEn").chosen().val();
    });

    $("#categories").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.photo.category = $("#categories").chosen().val();
    });

    $("#vendors").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.photo.vendor = $("#vendors").chosen().val();
    });

  };

  enTagsContainsTag(tagId) {
    return this.photo.tagEn.some(entry => entry === tagId);
  }

  arTagsContainsTag(tagId) {
    return this.photo.tagAr.some(entry => entry === tagId);
  }


  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/photos-defaults`);
  };

  async ngAfterViewInit() {
    let tempLookup = await this.getLookups();
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
      constants.VIEWS["PHOTOS"]
    )) as any;
    this.lang = lang;

    this.labels = resData.res;
  }

}
