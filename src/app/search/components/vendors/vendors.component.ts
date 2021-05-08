import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { httpService, localStorageService } from 'src/app/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  isAuthed: boolean;
  lang: any;

  constructor(private http: httpService , private toaster: ToastrService,
    private spineer: NgxSpinnerService, private stoarge: localStorageService) { }

  ngOnInit() {
  }

  pageChange(e: any){

  };

  checkLoginStatus(){
    let isLogined = this.stoarge.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
