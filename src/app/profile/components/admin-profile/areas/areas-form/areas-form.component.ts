import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { area, constants, urls, httpService, responseModel, localStorageService } from 'src/app/core';
declare var $: any;

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit, AfterViewInit {
  editingMode = "new";
  that = this;
  layoutRouting = "";

  currentUserEmail: string;

  area: area = {
    nameEn: "",
    nameAr: "",
    order: 0,
    isHidden:false
  };

  constructor( private router: Router, @Inject(DOCUMENT) private document: any, 
  private elementRef: ElementRef,private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService,private activatedRoute: ActivatedRoute,
    private storage: localStorageService,private http: httpService,
    ) { 
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
    }

  ngOnInit() {
    this.loadScripts();
    this.initAreaView();
  }

  initAreaView(){
    if(this.editingMode == "update"){
      this.area = this.storage.getLocalStorage("weds360#areaOnEdit");
    }
  };

  createNewEntity(){
    this.ngxSpinner.show();

    let createURL = `${urls.CREATE_AREA}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL , {} , { "area" : this.area }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Area has been saved succesfully" , "Area has been updated, Bingo!");
        this.router.navigateByUrl('/profile/en/admin/areas-defaults');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your area couldn't created on the server!");
      }
    });
  };

  updateExistingEntity(){
    this.ngxSpinner.show();

    let updateURL = `${urls.UPDATE_AREA}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(updateURL , {} , { "area" : this.area }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Area has been saved succesfully" , "An area has been updated and wedding website will be impacted.");
        this.router.navigateByUrl('/profile/en/admin/areas-defaults');
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your area couldn't created on the server!");
      }
    });
  };


  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/areas-defaults');
  };


  ngAfterViewInit(): void {
    this.loadScripts();
  }

  loadScripts(){
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
