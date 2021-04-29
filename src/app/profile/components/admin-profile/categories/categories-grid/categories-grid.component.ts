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

  categoriesList: category[] = [];
  categoriesSegments = constants.SEGMENTS;
  categoriesLayouts = constants.LAYOUTS;

  lang: string;
  labels: any = {};

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  categoriesLookups: category[] = [];
  showPaging = true;
  // End paging vars!

  // Search vars!
  searchableList: category[] = [];
  selectedSearchCategory: string = "";
  searchKey = undefined;
  selectedSearchLayout: string;
   // End search vars!


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
      e.data.angularThis.selectedSearchLayout = $("#categoriesLayouts").chosen().val();
    });
    $("#categoriesSegments").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.selectedSearchCategory = $("#categoriesSegments").chosen().val();
    });
  };


  getAllCategories() {
    this.ngxSpinner.show();
    let getAllCategoriesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllCategoriesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.categoriesList = response.data as category[];
        this.categoriesList = this.searchableList = this.categoriesList.filter(x => x.isRemoved == false);
        this.collectionSize = this.categoriesList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

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


  //#search region functions
  search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.categoriesList.filter((aCategory) => {
      return (aCategory.parentMenu == this.selectedSearchCategory)
        || (aCategory.layout == this.selectedSearchLayout)
        || (aCategory.nameEn.includes(this.searchKey)
        || aCategory.nameAr.includes(this.searchKey));
    });

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.searchableList.length;
    }, 0);
  };

  clearSearch(){
    this.showPaging = false;
    this.ngxSpinner.show();
    window.scroll(0,0);
    this.searchableList = this.categoriesList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.categoriesList.length;
      this.searchKey = undefined;
    }, 0);

  };
  //#endregion

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion
}
