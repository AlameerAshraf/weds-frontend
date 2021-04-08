import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, event, httpService, responseModel, urls } from 'src/app/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit{
  currentUserEmail: string;
  listOfEvents: event[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private router: Router, private http: httpService,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
     this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }


  ngOnInit() {
    this.getAllEventsPerUser();
  }


  getAllEventsPerUser(){
    this.ngxSpinner.show();
    let getAllEventsURL = `${urls.GET_EVENTS_PER_USER}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(getAllEventsURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.listOfEvents = response.data as event[];
        this.ngxSpinner.hide();

        this.getDaysDetails();
        console.log(this.listOfEvents)
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
  }

  viewEventDetails(id: any){
    this.router.navigateByUrl(`/profile/en/user/event-details/${id}`);
  };

  inviteFriends(id: any){
    this.router.navigateByUrl(`/profile/en/user/invite/${id}`);
  };

  createNewEvent(){
    this.router.navigateByUrl('/profile/en/user/create-event');
  };
}
