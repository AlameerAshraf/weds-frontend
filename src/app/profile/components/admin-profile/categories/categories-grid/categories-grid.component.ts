import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants, resources, category, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;
    that = this;
    layout = "";
  parentMenu = "";

  categoriesList: category[] = [];
  categoriesSegments = constants.SEGMENTS;
  categoriesLayouts = constants.LAYOUTS;

  lang: string;
  labels: any = {};
  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
      this.loadResources();
      this.storage.eraseLocalStorage("weds360#categoryOnEdit");
  }

  ngOnInit() {
    this.getAllCategories();
    this.documentSelectors();
  }

  documentSelectors() {
    $("#categoriesLayouts").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.layout = $("#categoriesLayouts").chosen().val();
    });
    $("#categoriesSegments").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.parentMenu = $("#categoriesSegments").chosen().val();
    });
  };


  getAllCategories() {
    this.ngxSpinner.show();
    let getAllCategoriesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllCategoriesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.categoriesList = response.data as category[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };

  pageChange(pageNumber) {

  };

  editEntity(id: any){
    this.router.navigate([`profile/${this.lang}/admin/categories-action/update`]);
    let targetTheme = this.categoriesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#categoryOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_CATEGORY}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Category has been deleted succesfully" , "An category has been deleted and wedding website will be impacted.");
        this.getAllCategories();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your category couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewCategory() {
    this.router.navigate([`profile/${this.lang}/admin/categories-action/new`]);
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
