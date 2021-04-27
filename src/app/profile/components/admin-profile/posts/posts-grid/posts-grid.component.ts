import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { responseModel , urls , httpService , constants, localStorageService, post, resources , LookupsService, category } from './../../../../../core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $

@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.scss']
})
export class PostsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  postsList : post[] = [];

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  categoriesLookups: category[] = [];
  showPaging = true;
  // End paging vars!

  // Search vars!
  searchableList : post[] = [];
  selectedSearchCategory: string = "";
  that: any = this;
  searchKey = undefined;
  // End search vars!
  labels: any = {};
  lang: string;

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private lookupsService: LookupsService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private storage: localStorageService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  async ngOnInit() {
    this.getAllPosts();
    this.documentSelectors();
    await this.getLookups();
  }



  getAllPosts() {
    this.spinner.show();
    let getAllPostsURL = `${urls.GET_ALL_POSTS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(getAllPostsURL, {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.postsList = this.searchableList = response.data as post[];
        this.collectionSize = this.postsList.length;
        this.pageChange(1);
      }else{
        this.spinner.hide();
        this.toastr.error("Our bad sorry!" , "Error loading data from the server, try again later!");
      }
    });

  };



  navigateToCreateNewPost() {
    this.router.navigate([`profile/${this.lang}/admin/posts-action/new`]);
  };

  navigateToUpdatePost(postId: any){
    let targetPost = this.postsList.find(x => x._id == postId);
    this.storage.setLocalStorage("weds360#postOnEdit" , targetPost);
    this.router.navigate([`profile/${this.lang}/admin/posts-action/update`]);
  };

  search(){
    this.showPaging = false;
    this.spinner.show();

    this.searchableList = this.postsList.filter((aPost) => {
      return (aPost.category == this.selectedSearchCategory)
        || (aPost.titleEn.includes(this.searchKey)
        || aPost.titleAr.includes(this.searchKey));
    });

    setTimeout(() => {
      this.spinner.hide();
      this.showPaging = true;
      this.collectionSize = this.searchableList.length;
    }, 0);
  };

  clearSearch(){
    this.showPaging = false;
    this.spinner.show();

    this.searchableList = this.postsList;

    setTimeout(() => {
      this.spinner.hide();
      this.showPaging = true;
      this.collectionSize = this.postsList.length;
    }, 0);

  };


  //#region Helper methods
  async getLookups(){
    let categories = (await this.lookupsService.getCategories() as responseModel).data;
    this.categoriesLookups = categories as category[];
  };

  documentSelectors(){
    $("#cats").change({ angularThis: this.that } ,function(e, params){
      e.data.angularThis.selectedSearchCategory = $("#cats").chosen().val();
    });
  };
  //#endregion

  //#region Scripts loader
  async ngAfterViewInit() {
    await this.getLookups();
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

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion
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
      constants.VIEWS["POSTS"]
    )) as any;
    this.labels = resData.res;
  }
}
