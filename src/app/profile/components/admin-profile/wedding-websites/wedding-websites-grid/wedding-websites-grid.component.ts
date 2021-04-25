import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, weddingWebsite, localStorageService , responseModel , urls , httpService } from 'src/app/core';


@Component({
  selector: 'app-wedding-websites-grid',
  templateUrl: './wedding-websites-grid.component.html',
  styleUrls: ['./wedding-websites-grid.component.scss']
})
export class WeddingWebsitesGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  weddingWebsiteList: weddingWebsite[] = [];

  labels:any={}
  lang:string
  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#weddingWebsiteOnEdit");
}


  ngOnInit() {
    this.getAllThemes();
  }

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
        constants.VIEWS["WEDDING_WEBSITE"]
      )) as any;
      this.labels = resData.res;
  };

  getAllThemes() {
    this.ngxSpinner.show();
    let getAllWeddingWebsitesURL = `${urls.GET_ALL_WEDDING_LIST}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllWeddingWebsitesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.weddingWebsiteList = response.data as weddingWebsite[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

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
