import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, event, httpService, responseModel, urls,resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit{
  currentUserEmail: string;
  listOfEvents: event[] = [];
  labels: any = {};
  lang: string;
  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private router: Router, private http: httpService, private resources: resources,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
     this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }


  ngOnInit() {
    this.getAllEventsPerUser();
    this.loadResources();
  }


  getAllEventsPerUser(){
    this.ngxSpinner.show();
    let getAllEventsURL = `${urls.GET_EVENTS_PER_USER}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(getAllEventsURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.listOfEvents = response.data as event[];
        this.ngxSpinner.hide();

        this.getDaysDetails();
        this.countStatuesForEvents();

        this.listOfEvents.sort(function(a: any,b:any){
          let aDate: any = new Date(a.date.split('T')[0]);
          let bDate: any = new Date(b.date.split('T')[0]);

          return aDate- bDate;
        });

      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Error loading events data.");
      }
    });
  };

  getDaysDetails(){
    this.listOfEvents.forEach((anEevent) => {
      anEevent.numbersOfDaysToEvent = this.getDifferenceBetweenDays(anEevent.date);
      anEevent.day = new Date(anEevent.date.toString().split('T')[0]).getDate().toString();
      anEevent.month = constants.MONTHS[new Date(anEevent.date.toString().split('T')[0]).getMonth()];
      anEevent.dateText = anEevent.date.toString().split('T')[0];
    });
  };

  getDifferenceBetweenDays(eventDay){
    const anEventDate: any = new Date(eventDay.split('T')[0]);
    const currentDate: any = new Date();
    const diffTime = Math.abs(currentDate - anEventDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  countStatuesForEvents(){
    this.listOfEvents.forEach((anEvent) => {
      anEvent.counts = { DECLINED: 0 , GOING : 0 , INVITED: 0 , NO_RESPONSE: 0 };
      anEvent.guestList.forEach((guest) => {
        anEvent.counts.INVITED = anEvent.counts.INVITED + 1;

        if(guest.status == "GOING")
          anEvent.counts.GOING = anEvent.counts.GOING + 1;
        if(guest.status == "DECLINED")
          anEvent.counts.DECLINED = anEvent.counts.DECLINED + 1;
        if(guest.status == "NO_RESPONSE")
          anEvent.counts.NO_RESPONSE = anEvent.counts.NO_RESPONSE + 1;
      })
    })

    console.log(this.listOfEvents)
  };

  viewEventDetails(id: any){
    this.router.navigateByUrl(`/profile/${this.lang}/user/event-details/${id}`);
  };

  inviteFriends(id: any){
    this.router.navigateByUrl(`/profile/${this.lang}/user/invite/${id}`);
  };

  createNewEvent(){
    this.router.navigateByUrl(`/profile/${this.lang}/user/create-event`);
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
