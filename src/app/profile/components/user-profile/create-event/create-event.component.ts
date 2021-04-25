 import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, event, httpService, responseModel, urls ,resources} from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  currentUserEmail: string;

  newEvent: event = {
    showOnWeddingWebsite: false,
    location: "",
    name: "",
    date: new Date(),
    description: "",
    ownerEmail: "",
    guestList: []
  };
  date = "";

  labels: any = {};
  lang: string;
  constructor(@Inject(DOCUMENT) private document: any,private resources: resources,
  private elementRef: ElementRef, private router: Router , private httpService: httpService,
  private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.loadResources();
  };

  backToRoute(){
    this.router.navigateByUrl(`profile/${this.lang}/user/events`);
  };

  createNewEvent(){
    this.ngxSpinner.show();
    let dateValue: any = document.getElementById("date-picker");
    let toBeShownOnWS: any = document.getElementById("check-a");
    this.newEvent.date =  new Date(dateValue.value);
    this.newEvent.showOnWeddingWebsite = toBeShownOnWS.checked;
    this.newEvent.ownerEmail = this.currentUserEmail;

    let createEvenetURL = `${urls.CREATE_EVENT}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.httpService.Post(createEvenetURL , {}, { "event" : this.newEvent }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Weds360 has created the event for you." , "Let's celebrate your event has been created 💥🎉");
        this.router.navigateByUrl(`profile/${this.lang}/user/events`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your event is not created, trya again later!");
      }
    });
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js' , 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  async loadResources() {
    const lang =
        window.location.href.toString().toLowerCase().indexOf('ar') > -1
          ? 'ar'
          : 'en';

    const resourceLang =
        lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    const resData = (await this.resources.load(
        resourceLang,
        constants.VIEWS['EVENTS']
      )) as any;
    this.labels = resData.res;
  }
}
