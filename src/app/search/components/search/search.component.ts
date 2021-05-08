import { localStorageService, httpService } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isAuthed: boolean;
  lang: any;

  constructor(private http: httpService , private toaster: ToastrService,
    private spineer: NgxSpinnerService, private stoarge: localStorageService) { }

  ngOnInit() {
  }

  checkLoginStatus(){
    let isLogined = this.stoarge.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
