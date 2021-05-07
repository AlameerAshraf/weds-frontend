import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, message, resources, responseModel, urls, user } from 'src/app/core';

@Component({
  selector: 'app-vendor-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
  messages : message[] = [];
  me: any = "";

  messageBody = "";
  currentUserEmail: string;
  destinationUser: any;

  skip = 0;
  limit = 0;
  pageSize: any = 10;
  pageNumber: any = 0;
  myAvatar: string;
  user: user = new user();

  constructor(private resources: resources, private router: Router,
    private http: httpService, private toaster: ToastrService,
    private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.me = atob(window.localStorage.getItem("weds360#id"));
    this.myAvatar = window.localStorage.getItem("weds360#avatar");

    this.activatedRoute.queryParams.subscribe((params) => {
      this.destinationUser = params["dest"];
      this.getDestinationUser();
    })
  }

  ngOnInit() {
    window.scroll(0 , 0);
    this.spinner.hide();

    this.loadMessages();
  };


  getDestinationUser(){
    let loadUserURL = `${urls.GET_USER_BY_ID}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(loadUserURL , { "id" : this.destinationUser }).subscribe((response: responseModel) => {
      if(!response.error){
        this.user = response.data as user;
      }else{
        this.spinner.hide();
        this.toaster.error("Our bad sorry!" , "My bad, server couldn't load user's data.");
      }
    });
  };

  send(){
    this.spinner.show();
    let sendMessageURL = `${urls.SEND_MESSAGE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(sendMessageURL , {} , { "message" : { "body" : this.messageBody , "to" : this.destinationUser ,  "from" : this.me } }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.messageBody = "";
        this.messages.push({ body: response.data.body , to: response.data.to , from: response.data.from  });
        this.toaster.success("message has been delivered");
        this.scrollToLatestMessage();
      } else {
        this.toaster.success("Error delivering the message!");
      }
    })
  };

  loadMessages(){
    this.spinner.show();

    this.pageNumber = this.pageNumber + 1;
    this.limit = this.pageSize * this.pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);

    let allMessagesInConversationURL = `${urls.GET_MESSAGES_IN_CONVERSATION}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(allMessagesInConversationURL,
      { "skip": this.skip, "limit": this.limit, "dest": this.destinationUser }).subscribe((response: responseModel) => {
        if (!response.error) {
          this.spinner.hide();
          this.messages = response.data.reverse().concat(this.messages);

          if(this.pageNumber == 1){
            setTimeout(() => {
              var box = document.getElementById('message-content');
              box.scrollTop = box.scrollHeight;
            }, 0);
          }
        } else {

        }
      })
  };

  onScrollUp() {
    this.loadMessages();
  };

  //#region Helpers methods..
  scrollToLatestMessage(){
    setTimeout(() => {
      var box = document.getElementById('message-content');
      box.scrollTop = box.scrollHeight;
    }, 0);
  };
  //#endregion
}
