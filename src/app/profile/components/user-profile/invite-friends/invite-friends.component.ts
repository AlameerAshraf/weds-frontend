import { constants, httpService, urls, responseModel,resources } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
  currentUserEmail: string;
  invitation = { name: "" , email: "" , phone: "" , invitationMessage: "" }
  eventId: any;
  labels: any = {};
  lang: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute , private http: httpService,
  private ngxSpinner: NgxSpinnerService , private toastr: ToastrService,private resources:resources) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.activatedRoute.params.subscribe((params) => {
      this.eventId = params["eventId"];
    })
  }


  ngOnInit() {
    this.loadResources()
  }

  invite(){
    this.ngxSpinner.show();
    let invitationURL = `${urls.INVITE_TO_EVENT}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(invitationURL , {} , { "invitation" : this.invitation , "eventId" : this.eventId }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Invitation has been sent" , "Your friend has been invited now wait him to responde ♥");
        this.router.navigateByUrl(`profile/${this.lang}/user/events`);
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your invitation couldn't be sent now.");
      }
    });
  };

  backToRoute(){
    this.router.navigateByUrl(`profile/${this.lang}/user/events`);
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
