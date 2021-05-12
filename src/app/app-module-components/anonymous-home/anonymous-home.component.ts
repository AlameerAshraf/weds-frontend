import { responseModel } from './../../core/models/response';
import { urls } from './../../core/helpers/urls/urls';
import { httpService } from './../../core/services/http/http';
import { Component, OnInit } from '@angular/core';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { constants, resources, area, category, Common, post } from 'src/app/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './anonymous-home.component.html',
  styleUrls: ['./anonymous-home.component.scss']
})
export class AnonymousHomeComponent implements OnInit, AfterViewInit {
  // Animation variables!
  startTypingAnimation: boolean = true;

  allCategories = [];
  allAreas = [];
  blogs: post[] = [];
  featuredAreas; //vendorsd
  //labels
  labels: any = {};
  lang: string;
  defaultBlogImage: string
  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService, private common: Common, private router: Router,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.defaultBlogImage = 'assets/images/defaultImage/blog-default.png'
  }


  ngOnInit() {
    this.getAllCategories();
    this.getAllAreas();
    this.getAllBlog();
  };

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let lang =
      window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["HOME_LAYOUT"]) as any;;
    this.labels = resData.res;
  };

  getAllCategories() {
    let allCatesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allCatesURL, { "anonymous" : true }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allCategories = response.data;
        if (this.allCategories.length > 0) this.allCategories = this.allCategories.slice(0, 10);

      } else {
        console.log(response.error);
      }
    });
  };


  getAllAreas() {
    let allAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allAreasURL, { "anonymous" : true }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allAreas = response.data;
      } else {
        console.log(response.error);
      }
    });
  };


  getAllBlog() {

    let url = `${urls.GET_ALL_BLOGS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(url, { "anonymous" : true }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.blogs = response.data as post[];
        if (this.blogs.length > 0) this.blogs = this.blogs.sort((d1, d2) => new Date(d1.publishedAt).getTime() - new Date(d2.publishedAt).getTime()).slice(0, 3);

        console.log(this.blogs)

      } else {
        console.log(response.error);
      }
    });
  };

  navigateToBlog(categoryName, blogId) {
    categoryName = categoryName.replace(/ /g, "-");
    this.router.navigate([`blogs/${this.lang}/blog/${categoryName}/${blogId}`]);
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/typedwords.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
