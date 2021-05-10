import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { constants, resources, responseModel, urls, vendor } from 'src/app/core';
import { environment } from '../../../environments/environment';
import { httpService } from './../../core/services/http/http';

@Component({
  selector: 'app-authorized-home',
  templateUrl: './authorized-home.component.html',
  styleUrls: ['./authorized-home.component.scss']
})
export class AuthorizedHomeComponent implements OnInit {
  allCategories = [];
  //labels
  labels: any = {};
  lang: string;
  reviews = []
  allAreas = [];
  allVendors: vendor[] = [];
  fitnessVendors: vendor[] = [];
  venuesVendors: vendor[] = [];
  designerVendors: vendor[] = [];
  photographerVendors: vendor[] = [];
  newVendors: vendor[] = [];

  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources()
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllAreas();

    const englishReviews = [
      {
        name: "Mohammed & Mona",
        review: "Thank You For the amazing Service, it was great planning my wedding with you ",
        type: "COUPLES"

      },
      {
        name: "Ahmed & Mahi",
        review: "SUPER!! we've heard about WEDS360 from our friends, they told us how easy it was to plan the wedding and they were right",
        type: "COUPLES"
      },
      {
        name: "Arasny & Madonna",
        review: "it was the greatest thing we've ever done using WEDS360 services,its good and i recommend it",
        type: "COUPLES"
      },
    ]
    const arabicReviews = [
      {
        name: "محمد ومنى",
        review: "شكرًا على الخدمة الرائعة ، لقد كان التخطيط لحفل زفافي معك أمرًا رائعًا ",
        type: "عروسين"
      },
      {
        name: "احمد وماهي",
        review: "ممتاز!! لقد سمعنا عن WEDS360 من أصدقائنا ، وأخبرونا كيف كان من السهل التخطيط لحفل الزفاف وكانوا على حق",
        type: "عروسين"

      },
      {
        name: "أرساني ومدونا",
        review: "لقد كان أعظم شيء قمنا به على الإطلاق باستخدام خدمات WEDS360 ، إنه جيد وأنا أوصي به",
        type: "عروسين"

      },
    ]
    this.reviews = this.lang === 'ar' ? [...arabicReviews] : [...englishReviews]
    this.getFeaturedVendors()
    this.getCategoriesById("6087338b21ce659724e9a5e7", 'fitness')
    this.getCategoriesById("6087338b21ce659724e9a5e2", 'venues')
    this.getCategoriesById("6087338b21ce659724e9a5f2", 'designer')
    this.getCategoriesById("6087338b21ce659724e9a5dc", 'photographer')
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/typedwords.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  getAllCategories() {
    let allCatesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allCatesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allCategories = response.data;
      } else {
        console.log(response.error);
      }
    });
  };
  async loadResources() {
    let lang =
      window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["HOME_LAYOUT"]) as any;;
    this.labels = resData.res;
  };
  getAllAreas() {
    let allAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allAreasURL, {}).subscribe((response: responseModel) => {

      if (!response.error) {
        this.allAreas = response.data;

      } else {
        console.log(response.error);
      }
    });
  };

  getFeaturedVendors() {
    let url = `${urls.GET_FEATURED_VENDORS}/${constants.APP_IDENTITY_FOR_USERS} `;
    this.http.Get(url, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allVendors = response.data as vendor[];
        if (this.allVendors.length > 0) this.allVendors.slice(0, 6)
      } else {
        console.log(response.error);
      }
    });
  }
  async getVendorById(id) {
    let url = `${urls.GET_FEATURED_VENDORS}/${constants.APP_IDENTITY_FOR_USERS} `;
    return this.http.Get(url, { "vendorId": id }).toPromise();

  }
  async getCategoriesById(id, name) {

    const response = await this.getVendorById(id) as responseModel;
    const vendors = response.data
    console.log('getCategoriesById,', vendors)
    if (vendors.length > 0) {
      switch (name) {
        case "fitness":
          this.fitnessVendors = vendors;
          break;
        case "venues":
          this.venuesVendors = vendors;
          break;
        case "designer":
          this.designerVendors = vendors;
          break;
        case "photographer":
          this.photographerVendors = vendors;
      }
    }

  }
}
