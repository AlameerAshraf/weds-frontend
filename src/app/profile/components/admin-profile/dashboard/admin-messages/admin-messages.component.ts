import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { conatct, constants, httpService, resources, responseModel, urls } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-vendor-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

  lang: string;
  labels: any = {};
  contacts: conatct[] = [];
  currentUserEmail: string;

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  constructor(private resources: resources, private router: Router, private http: httpService,
    private toaster: ToastrService, private spinner: NgxSpinnerService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.loadResources();
    this.getAllUserContacts();
  }

  getAllUserContacts(){
    this.spinner.show();
    let contactsURL = `${urls.GET_CONTACTS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(contactsURL , {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide();
        this.contacts = response.data as conatct[];
        this.collectionSize = this.contacts.length;
        this.pageChange(1);

        this.contacts.forEach((aContact) => {
          aContact.userAvatar = (aContact.userAvatar == "" || aContact.userAvatar == undefined)
            ? "assets/images/defaults/avatar/vendor.png" : aContact.userAvatar;
        });

      } else {
        this.spinner.hide();
        this.toaster.error("Error loading your contacts", "Something wnet wrong on the server!");
      }
    })
  };


  redierctToSingleChat(contactId){
    this.spinner.show();
    this.router.navigate([`profile/${this.lang}/admin/chat`] , { queryParams: { 'dest' : contactId } })
  };

  timeSince(date: any) {

    let currentDate = new Date() as any;
    let compareDate = new Date(date) as any;

    var seconds = Math.floor((currentDate - compareDate) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  pageChange(pageNumber){
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };

  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    // alert(this.lang);
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["MESSAGES"]
    )) as any;
    this.labels = resData.res;
  };
}
