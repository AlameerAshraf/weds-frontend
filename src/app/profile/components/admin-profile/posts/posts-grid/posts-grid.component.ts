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
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.scss']
})
export class PostsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  postsList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
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
    let getAllPostsURL = `${urls.GET_ALL_POSTS}/${constants.APP_IDENTITY_FOR_USERS}`;


    this.http.Get(getAllPostsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {

        this.postsList = response.data;
      } else {

        console.log(response.error);
      }
    });

  };

  pageChange(pageNumber) {

  };

  navigateToCreateNewPost() {
    this.router.navigate(['profile/en/admin/posts-action/new']);
  }


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
}
