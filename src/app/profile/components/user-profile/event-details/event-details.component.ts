import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, urls, responseModel, event } from 'src/app/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  currentUserEmail: string;
  eventId: any;
  anEevent: event;
  allGuests: { status_txt?: string  , status: string , name: string , email: string , phone: string , invitationMessage: string }[] = [];


  constructor(private router: Router, private http: httpService, private activatedRoute: ActivatedRoute,
    private ngxSpinner: NgxSpinnerService, private toastr: ToastrService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.activatedRoute.params.subscribe((params) => {
      this.eventId = params["eventId"];
    })
  }

  ngOnInit() {
    this.getGuestsPerEvent();
  }

  getGuestsPerEvent(){
    this.ngxSpinner.show();
    let guestListURL = `${urls.GET_GUEST_list_PER_EVENT}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(guestListURL , {} , { "eventId" : this.eventId }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.anEevent = response.data;
        this.getDaysDetails();

        this.allGuests = this.anEevent.guestList;
        this.getStatusText();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, coludn't load guest list");
      }
    });
  };

  getDaysDetails() {
    this.anEevent.numbersOfDaysToEvent = this.getDifferenceBetweenDays(this.anEevent.date);
    this.anEevent.day = new Date(this.anEevent.date.toString().split('T')[0]).getDate().toString();
    this.anEevent.month = constants.MONTHS[new Date(this.anEevent.date.toString().split('T')[0]).getMonth()];
    this.anEevent.dateText = this.anEevent.date.toString().split('T')[0];
  };

  getDifferenceBetweenDays(eventDay){
    const anEventDate: any = new Date(eventDay.split('T')[0]);
    const currentDate: any = new Date();
    const diffTime = Math.abs(currentDate - anEventDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  getStatusText(){
    this.allGuests.forEach((guest) => {
    guest.status_txt = constants.GUESTS_STATUSES[guest.status];
    })
  }
}
