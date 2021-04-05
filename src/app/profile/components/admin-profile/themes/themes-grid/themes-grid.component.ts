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
  selector: 'app-themes-grid',
  templateUrl: './themes-grid.component.html',
  styleUrls: ['./themes-grid.component.scss']
})
export class ThemesGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  themesList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }
  
  ngOnInit() {
    this.getAllThemes();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllThemes() {
    let getAllThemesURL = `${urls.GET_ALL_THEMES}/${constants.APP_IDENTITY_FOR_USERS}`;
    console.log(getAllThemesURL)

    this.http.Get(getAllThemesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        console.log(response)
        this.themesList = response.data;
      } else {
        console.log("error")
        console.log(response.error);
      }
    });

  };

  pageChange(pageNumber) {

  };

  navigateToCreateNewTheme() {
    this.router.navigate(['profile/en/admin/themes-action/new']);
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
