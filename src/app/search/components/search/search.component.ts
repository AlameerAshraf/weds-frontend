import { localStorageService, httpService } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isAuthed: boolean;
  lang: any;

  constructor(private http: httpService, private toaster: ToastrService,
    private spineer: NgxSpinnerService, private stoarge: localStorageService, @Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

  ngOnInit() {
    this.lang = window.location.href.toString().toLowerCase().indexOf("ar") > -1 ? "ar" : "en";
    this.loadMainStyleSheet();
  }
  loadMainStyleSheet() {
    const style = ['assets/styles/style.rtl.css',]
    if (this.lang === 'ar') this.document.getElementById("styleSheetTest").value = 'assets/styles/style.rtl.css'

  };

  checkLoginStatus() {
    let isLogined = this.stoarge.getLocalStorage("weds360#data");
    if (isLogined != undefined || isLogined != '') {
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
