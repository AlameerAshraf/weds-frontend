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
  selector: 'app-areas-grid',
  templateUrl: './areas-grid.component.html',
  styleUrls: ['./areas-grid.component.scss']
})
export class AreasGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  areasList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {
    //this.loadScripts();
    this.getAllAreas();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllAreas() {
    let getAllAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    console.log(getAllAreasURL)

    this.http.Get(getAllAreasURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        console.log(response)
        this.areasList = response.data;
      } else {
        console.log("error")
        console.log(response.error);
      }
    });

  };


  pageChange(pageNumber) {

  };

  navigateToCreateNewArea() {
    this.router.navigate(['profile/en/admin/areas-action/new']);
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
