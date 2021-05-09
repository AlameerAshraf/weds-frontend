import { area, category, constants, httpService, LookupsService, resources, responseModel, urls } from 'src/app/core';
import { localStorageService } from './../../../core/services/local-storage/local-storage';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfCategoriesComponent implements OnInit, AfterViewInit {
  isSearchExpanded = false;
  isAuthed: boolean;
  categories: category[] = [];
  areas: area[] = [];
  lang: any;
  categoriesList: category[] = [];
  imageObject: Array<object> = [];
  segmentName: string


  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 9;
  limit: number;
  skip: number;
  categoriesLookups: category[] = [];
  showPaging = true;
  // End paging vars!

  constructor(@Inject(DOCUMENT) private document: any,
    private http: httpService, private lookupsService: LookupsService,
    private elementRef: ElementRef, private router: Router, private activatedRoute: ActivatedRoute, private ngxSpinner: NgxSpinnerService,
    private localStorage: localStorageService) {
    this.activatedRoute.params.subscribe((params) => {
      this.segmentName = params['segmentName'];
      this.segmentName = this.segmentName.toUpperCase();

    })
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.loadScripts();
    await this.getAllCategories()
    await this.loadResources();
    await this.getLookups();
  }

  navigateToVendorsList(categoryName, categoryId) {
    if(categoryName == "PHOTOS"){
      this.router.navigate([`photos/${this.lang}/all`]);
    } else {
      categoryName = categoryName.replace(/ /g, "-");
      this.router.navigate([`segment/${this.lang}/all-vendors/${categoryName}/${categoryId}`]);
    }
  };

  //#region Searches Helpers ..
  showCategories(event: any) {
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  };

  getAllCategories() {
    this.ngxSpinner.show()
    let getCategoiresBySeggment = `${urls.GET_CATEGORIES_BY_SEGMENT}/${constants.APP_IDENTITY_FOR_USERS}/${this.segmentName}`

    this.http.Get(getCategoiresBySeggment, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.categoriesList = response.data as category[];
        this.collectionSize = this.categoriesList.length;
        this.pageChange(1);
      } else {
        this.ngxSpinner.hide()
      }
    })
  };

  async getLookups() {
    this.categories = (await this.lookupsService.getCategories() as responseModel).data;
    this.areas = (await this.lookupsService.getAreas() as responseModel).data;

    this.categories.forEach((singleCategory) => {
      if (this.lang == "en") {
        singleCategory.name = singleCategory.nameEn;
        singleCategory.description = singleCategory.descriptionEn;
        singleCategory.subDescription = singleCategory.subDescriptionEn;
      } else {
        singleCategory.name = singleCategory.nameAr;
        singleCategory.description = singleCategory.descriptionAr;
        singleCategory.subDescription = singleCategory.subDescriptionAr;
      }

      this.imageObject.push(
        {
          image: singleCategory.photo,
          thumbImage: singleCategory.photo,
          alt: singleCategory.name,
          title: singleCategory.name
        }
      )
    });
  };

  searchUsingCategory(event) {
    console.log(event)
  };
  //#endregion

  //#region Load Resources ..
  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang; this.lang = resourceLang;
  }
  //#endregion

  //#region Authorization Helpers
  checkLoginStatus() {
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if (isLogined != undefined || isLogined != '') {
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
  //#endregion

  //#region Pagination Region..
  pageChange(pageNumber) {
    window.scroll(0, 0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion

  //#region Scripts Helpers..
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
  //#endregion
}
