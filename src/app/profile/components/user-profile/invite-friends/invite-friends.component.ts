import { constants, httpService, urls, responseModel } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
  currentUserEmail: string;
  invitation = { name: "" , email: "" , phone: "" , invitationMessage: "" }
  eventId: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute , private http: httpService,
  private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.activatedRoute.params.subscribe((params) => {
      this.eventId = params["eventId"];
    })
  }


  ngOnInit() {
  }

  invite(){
    this.ngxSpinner.show();
    let invitationURL = `${urls.INVITE_TO_EVENT}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(invitationURL , {} , { "invitation" : this.invitation , "eventId" : this.eventId }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Invitation has been sent" , "Your friend has been invited now wait him to responde ♥");
        this.router.navigateByUrl('profile/en/user/events');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your invitation couldn't be sent now.");
      }
    });
  };

  backToRoute(){
    this.router.navigateByUrl('profile/en/user/events');
  };

}
