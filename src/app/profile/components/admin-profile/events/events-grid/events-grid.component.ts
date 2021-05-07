import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, event, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.scss']
})
export class EventsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  eventsList: event[] = [];
  currentUserEmail: string;
  labels:any={};
  lang:string;

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.loadResources();
    this.storage.eraseLocalStorage("weds360#eventOnEdit");
  }

  ngOnInit() {
    this.getAllEvents();
  }



  getAllEvents() {
    this.ngxSpinner.show();
    let getAllEventsURL = `${urls.GET_ALL_DEFAULT_EVENT}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllEventsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.eventsList = response.data as event[];
        this.collectionSize = this.eventsList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };


  editEntity(id: any){
    let targetTheme = this.eventsList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#eventOnEdit" , targetTheme);
    this.router.navigate([`profile/${this.lang}/admin/events-action/update`]);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_DEFAULT_EVENT}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Event has been deleted succesfully" , "Event has been deleted.");
        this.getAllEvents();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your event couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewEvent() {
    this.router.navigate([`profile/${this.lang}/admin/events-action/new`]);
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
        constants.VIEWS["EVENTS"]
      )) as any;
      this.labels = resData.res;
  };

    //#region Paging Helpers ..
    pageChange(pageNumber) {
      window.scroll(0,0);
      this.limit = this.pageSize * pageNumber;
      this.skip = Math.abs(this.pageSize - this.limit);
    };
    //#endregion
}
