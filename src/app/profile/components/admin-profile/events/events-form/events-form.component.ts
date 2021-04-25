import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { event, constants, urls, httpService, responseModel, localStorageService,resources} from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

  editingMode = "new";
  that = this;
  layoutRouting = "";

  currentUserEmail: string;
  themesLayoutLocations = constants.THEMES;
  event: event = {
    description: "",
    name: "",
    date: new Date(),
    ownerEmail:""
  };


  labels:any={}
  lang:string

  constructor( private router: Router, @Inject(DOCUMENT) private document: any, private resources: resources,
    private elementRef: ElementRef, private http: httpService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService,
    private ngxSpinner: NgxSpinnerService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.loadResources();
      this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
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
          constants.VIEWS["EVENTS"]
        )) as any;
        this.labels = resData.res;
    };

  ngOnInit() {
    this.loadScripts();
    this.initThemeView();
  }

  initThemeView(){
    if(this.editingMode == "update"){
      this.event = this.storage.getLocalStorage("weds360#eventOnEdit");
    }
  };

  createNewEntity(){
    this.ngxSpinner.show();
    this.event.ownerEmail = this.currentUserEmail;

    let createURL = `${urls.CREATE_EVENT}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL , {} , { "event" : this.event }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Event has been saved succesfully" , "Event has been updated, Bingo!");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/events-defaults`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your event couldn't created on the server!");
      }
    });
  };

  updateExistingEntity(){
    this.ngxSpinner.show();
    this.event.ownerEmail = this.currentUserEmail;

    let updateURL = `${urls.UPDATE_EVENT}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.event._id}`;
    this.http.Post(updateURL , {} , { "event" : this.event }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Event has been saved succesfully" , "A event has been created and wedding website will be impacted.");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/events-defaults`);
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your event couldn't created on the server!");
      }
    });
  };


  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/events-defaults`);
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
