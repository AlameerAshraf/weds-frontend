import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { responseModel , urls , httpService , constants, localStorageService, post, resources } from './../../../../../core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.scss']
})
export class PostsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  postsList : post[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private storage: localStorageService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {
    this.getAllPosts();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllPosts() {
    this.spinner.show();
    let getAllPostsURL = `${urls.GET_ALL_POSTS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(getAllPostsURL, {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.postsList = response.data as post[];
      }else{
        this.spinner.hide();
        this.toastr.error("Our bad sorry!" , "Error loading data from the server, try again later!");
      }
    });

  };

  pageChange(pageNumber) {

  };

  navigateToCreateNewPost() {
    this.router.navigate(['profile/en/admin/posts-action/new']);
  };

  navigateToUpdatePost(postId: any){
    let targetPost = this.postsList.find(x => x._id == postId);
    this.storage.setLocalStorage("weds360#postOnEdit" , targetPost);
    this.router.navigate([`profile/en/admin/posts-action/update`]);
  };


  //#region Scripts loader
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
