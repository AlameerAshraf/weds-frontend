import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { httpService, localStorageService, socialSharing } from 'src/app/core';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  isAuthed: boolean = false;

  constructor(private localStorage: localStorageService , private http: httpService ,
    private spinner: NgxSpinnerService, private toaster: ToastrService) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  share(type , url){
    socialSharing.createNavigationUrl(type , url);
  };


  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
