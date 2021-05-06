import { httpService } from './../../../../core/services/http/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { conatct, constants, resources, responseModel, urls } from "src/app/core";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-vendor-messages',
  templateUrl: './vendor-messages.component.html',
  styleUrls: ['./vendor-messages.component.scss']
})
export class VendorMessagesComponent implements OnInit {

  lang: string;
  labels: any = {};
  contacts: conatct[] = [];
  currentUserEmail: string;

  constructor(private resources: resources, private router: Router, private http: httpService,
    private toaster: ToastrService, private spinner: NgxSpinnerService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.loadResources();
    this.getAllUserContacts();
  }

  getAllUserContacts(){
    let allContacts = `${urls.GET_CONTACTS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(allContacts , {} ).subscribe((response: responseModel) => {

    })
  };


  redierctToSingleChat(contactId){
    this.spinner.show();
    this.router.navigate([`profile/${this.lang}/vendor/chat`] , { queryParams: { 'dest' : contactId } })
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
