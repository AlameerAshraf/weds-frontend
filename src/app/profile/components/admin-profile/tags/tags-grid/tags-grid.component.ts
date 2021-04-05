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
  selector: 'app-tags-grid',
  templateUrl: './tags-grid.component.html',
  styleUrls: ['./tags-grid.component.scss']
})
export class TagsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  tagsList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {
    this.getAllTags();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllTags() {
    let getAllTagsURL = `${urls.GET_ALL_TAGS}/${constants.APP_IDENTITY_FOR_USERS}`;
    

    this.http.Get(getAllTagsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        
        this.tagsList = response.data;
      } else {
        
        console.log(response.error);
      }
    });

  };

  pageChange(pageNumber){

  };

  navigateToCreateNewTag(){
    this.router.navigate(['profile/en/admin/tags-action/new']);
  }

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

}
