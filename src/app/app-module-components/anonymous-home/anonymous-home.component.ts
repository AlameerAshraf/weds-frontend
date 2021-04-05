import { responseModel } from './../../core/models/response';
import { urls } from './../../core/helpers/urls/urls';
import { httpService } from './../../core/services/http/http';
import { Component, OnInit } from '@angular/core';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { constants, resources } from 'src/app/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './anonymous-home.component.html',
  styleUrls: ['./anonymous-home.component.scss']
})
export class AnonymousHomeComponent implements OnInit, AfterViewInit {
  // Animation variables!
  startTypingAnimation: boolean = true;

  allCategories = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }


  ngOnInit() {
    this.getAllCategories();
  };

  /** Use this function at each view to load corrosponding resources! */
  async loadResources(){
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang , constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllCategories(){
    let allCatesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allCatesURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.allCategories = response.data;
      } else {
        console.log(response.error);
      }
    });
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/typedwords.js' , 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
