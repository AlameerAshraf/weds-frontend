import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { httpService, localStorageService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {
  isAuthed: boolean = false;

  constructor(private localStorage: localStorageService , private http: httpService ,
    private spinner: NgxSpinnerService, private toaster: ToastrService) { }

  ngOnInit() {
    this.checkLoginStatus();
  }


  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
