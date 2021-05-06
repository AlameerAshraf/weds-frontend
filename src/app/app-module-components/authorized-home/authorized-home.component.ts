import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, responseModel, urls } from 'src/app/core';
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
}
