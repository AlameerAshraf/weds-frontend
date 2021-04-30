import { area, category, httpService, LookupsService, resources, responseModel } from 'src/app/core';
import { localStorageService } from './../../../core/services/local-storage/local-storage';
import { Router } from '@angular/router';
import { slideInOutAnimation } from './../../../core/helpers/animations/slideInOutAnimation';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.scss'],
  animations: [slideInOutAnimation]
})
export class ListOfCategoriesComponent implements OnInit , AfterViewInit {
  isSearchExpanded = false;
  isAuthed: boolean;
  categories: category[] = [];
  areas: area[] = [];
  lang: any;

  imageObject: Array<object> = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private http: httpService, private lookupsService: LookupsService,
    private elementRef: ElementRef, private router: Router,
    private localStorage: localStorageService) { }

  async ngOnInit() {
    this.checkLoginStatus();
    this.loadScripts();

    await this.loadResources();
    await this.getLookups();
  }

  navigateToVendorsList(categoryName , categoryId){
    categoryName = categoryName.replace(/ /g,"-");
    this.router.navigate([`segment/en/all-vendors/${categoryName}/${categoryId}`]);
  };

  //#region Searches Helpers ..
  showCategories(event: any) {
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  };

  async getLookups(){
    this.categories = (await this.lookupsService.getCategories() as responseModel).data;
    this.areas = (await this.lookupsService.getAreas() as responseModel).data;

    this.categories.forEach((singleCategory) => {
      if(this.lang == "en"){
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

  searchUsingCategory(event){
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
  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
  //#endregion

  //#region Pagination Region..
  pageChange(pageNumber: number) {
    console.log(pageNumber);
  };
  //#endregion

  //#region Scripts Helpers..
  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
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
