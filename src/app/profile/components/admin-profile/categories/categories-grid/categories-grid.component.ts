import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { responseModel } from './../../../../../core/models/response';
import { urls } from './../../../../../core/helpers/urls/urls';
import { httpService } from '../../../../../core/services/http/http';
import { constants, resources } from 'src/app/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  categoriesList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {
    this.getAllCategories();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllCategories() {
    let getAllCategoriesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    console.log(getAllCategoriesURL)

    this.http.Get(getAllCategoriesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        console.log(response)
        this.categoriesList = response.data;
      } else {
        console.log("error")
        console.log(response.error);
      }
    });

  };

  pageChange(pageNumber) {

  };

  navigateToCreateNewCategory() {
    this.router.navigate(['profile/en/admin/categories-action/new']);
  };


  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
