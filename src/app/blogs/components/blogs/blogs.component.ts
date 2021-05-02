import { localStorageService } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  categoryId;
  isAuthed: boolean;

  constructor(private Router: Router, private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private localStorage: localStorageService ) {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params["categoryId"];
    });
  }

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
