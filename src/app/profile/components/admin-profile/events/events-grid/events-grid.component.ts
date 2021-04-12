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
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.scss']
})
export class EventsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  eventsList = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }

  ngOnInit() {
    this.getAllEvents();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllEvents() {
    let getAllEventsURL = `${urls.GET_ALL_EVENTS}/${constants.APP_IDENTITY_FOR_USERS}`;
    console.log(getAllEventsURL)

    this.http.Get(getAllEventsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        console.log(response)
        this.eventsList = response.data;
      } else {
        console.log("error")
        console.log(response.error);
      }
    });

  };

  pageChange(pageNumber) {

  };

  navigateToCreateNewEvent() {
    this.router.navigate(['profile/en/admin/events-action/new']);
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
