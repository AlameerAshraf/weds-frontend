import { constants, httpService, localStorageService, post, responseModel, urls, resources } from 'src/app/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleBlogComponent implements OnInit {
  yourHTML = "https://weds360-production.s3.eu-west-1.amazonaws.com/new-weds360-preprod/POSTS_BODY/607f72d3bb1d9b27f0d80030/607f72d3bb1d9b27f0d80030-ar.html";
  html: SafeHtml = "";
  blogs = [{
    name: "1"
  }];
  blogId;
  blogName: string;
  currentUserEmail: string;
  blog: post;
  lang: string;
  labels: any = {};
  constructor(private httpService: httpService, private _sanitizer: DomSanitizer, private resources: resources,
    private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private localStorage: localStorageService,
    private toastr: ToastrService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      console.log({ params })
      this.blogId = params['id'];
      this.blogName = params['name'];
    });
  }

  ngOnInit() {

    this.lang = window.location.href.toString().indexOf("/ar/") > -1 ? "ar" : "en";

    //   this.getFile();
    this.getBlogPost();
  }
  getBlogPost() {
    let blogPosURL = `${urls.GET_POST_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.httpService.Get(blogPosURL, { "postId": this.blogId }).subscribe((response: responseModel) => {
      console.log({ response })
      if (!response.error) {
        this.spinner.hide();
        this.blog = response.data as post;
        const fileUrl = this.lang === 'ar' ? this.blog.bodyArURL : this.blog.bodyEnURL;
        this.getFile(fileUrl);
        console.log(this.blog)
      } else {
        this.spinner.hide();
        this.toastr.error(`Our bad sorry!", "My bad, server couldn't post ${this.blogName}.`);
      }
    })
  };
  getFile(fileURL: string) {
    this.httpService.Fetch(fileURL, {}).subscribe((response: any) => {
      this.html = this._sanitizer.bypassSecurityTrustHtml(response);;
      console.log('html', response)
    })
  }

  onScroll(e) {
    // if(this.blogs.length >= 100) {
    //   console.log('No more items');
    //   return;
    // }
    console.log('scrolled!!', e);
    const moreBoxes = { name: "2" };
    this.blogs.push(moreBoxes)
  }
  async loadResources() {
    let resData = (await this.resources.load(this.lang, constants.VIEWS["BLOG"])) as any;

    this.labels = resData.res;
  }
}
