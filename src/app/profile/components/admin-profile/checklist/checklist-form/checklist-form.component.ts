import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { checklist, constants, urls, httpService, responseModel, localStorageService } from 'src/app/core';
declare var $: any;

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss']
})
export class ChecklistFormComponent implements OnInit {
  editingMode = "new";
  that = this;

  currentUserEmail: string;
  
  checklist: checklist = {
    note: "",
    noteEn: "",
    noteAr: "",
    title: "",
    titleEn: "",
    titleAr: "",
    isChecked: false
  };

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef, private http: httpService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {
    this.loadScripts();
    this.initCheckListView();
  };

  initCheckListView(){
    if(this.editingMode == "update"){
      this.checklist = this.storage.getLocalStorage("weds360#checkListOnEdit");
    }
  };


  createNewEntity(){
    this.ngxSpinner.show();
    let createCheckListURL = `${urls.CREATE_CHECKLIST_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;

    this.http.Post(createCheckListURL , {} , { "checkList" : this.checklist } ).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new checklist item created" , "Wow, Your checklist just created! start the planning! 🎉");
        this.router.navigateByUrl('/profile/en/admin/checklist-defaults');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't created on the server!");
      }
    })

  };


  updateExistingEntity(id: any){
    this.ngxSpinner.show();
    let updateChecklistURL = `${urls.UPDATE_CHECKLIST_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;

    this.http.Post(updateChecklistURL , {} , { "checkList" :this.checklist}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("We've updated your checkList!" , "Amazing you're doing great keep yourself updated, plane each step! 😍");
        this.router.navigateByUrl('/profile/en/admin/checklist-defaults');
      } else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't created on the server!");
      }
    })
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };




  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/checklist-defaults');
  };
}
