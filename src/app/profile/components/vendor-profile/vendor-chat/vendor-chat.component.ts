import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, resources, responseModel, urls } from 'src/app/core';

@Component({
  selector: 'app-vendor-chat',
  templateUrl: './vendor-chat.component.html',
  styleUrls: ['./vendor-chat.component.scss']
})
export class VendorChatComponent implements OnInit {
  messages = [];
  me: '123';

  messageBody = "";
  currentUserEmail: string;
  destinationUser: any;

  constructor(private resources: resources, private router: Router,
    private http: httpService, private toaster: ToastrService,
    private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.activatedRoute.queryParams.subscribe((params) => {
      this.destinationUser = params["dest"];
      console.log(this.destinationUser)
    })
  }

  ngOnInit() {
    window.scroll(0 , 0);
    this.onScroll('we')

    this.spinner.hide();
  }

  onScroll(e: any){
    let messages = [];

    this.messages = [
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      },
      {
        from: '123',
        to: '',
        messageBody: 'a7a ya zaky ya m3ras '
      }
    ]

    setTimeout(() => {
      var box = document.getElementById('message-content');
      box.scrollTop = box.scrollHeight;
      console.log(box.scrollHeight)
    }, 0);
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }

  send(){
    this.spinner.show();
    let sendMessageURL = `${urls.SEND_MESSAGE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Post(sendMessageURL , {} , { "message" : { "body" : this.messageBody , "to" : this.destinationUser } }).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.messageBody = "";
        console.log(response);
      } else {

      }
    })
  };

  loadMessages(){

  };
}
