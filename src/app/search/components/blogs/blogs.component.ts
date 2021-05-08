import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { httpService, localStorageService } from 'src/app/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  isAuthed: boolean;

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
