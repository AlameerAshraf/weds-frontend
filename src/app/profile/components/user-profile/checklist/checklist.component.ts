import { NgxSpinnerService } from 'ngx-spinner';
import { slideInOutAnimation , checklist , urls , httpService , constants , responseModel,resources} from './../../../../core';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  animations: [slideInOutAnimation]
})
export class ChecklistComponent implements OnInit, AfterViewInit {
  showNote = "";
  newlyCreatedCheckList : checklist = {
    isChecked: false,
    note: "",
    title: "",
    isNew: true,
    _id: "sd"
  };


  listOfUsersChecklists: checklist[] = [];
  currentUserEmail: string;

  labels: any = {};
  lang: string;
  constructor(@Inject(DOCUMENT) private document: any,private resources: resources,
    private elementRef: ElementRef, private http: httpService ,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) { }

  ngOnInit() {
    this.loadResources();
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.getChecklistsPerUser();
  }

  getChecklistsPerUser(){
    this.ngxSpinner.show();
    let getAllChecklists = `${urls.GET_ALL_CHECKLISTS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(getAllChecklists , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.listOfUsersChecklists = response.data as checklist[];
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    })

  };

  toggleNote(id: any){
    this.showNote = this.showNote == "" ? id : "";
  };

  check(id: any){
    let targetCheckList = this.listOfUsersChecklists.find(x => x._id == id);
    targetCheckList.isChecked = !targetCheckList.isChecked;

    this.updateChecklistItem(id);
  };

  createNewChecklist(){
    this.listOfUsersChecklists.push(this.newlyCreatedCheckList);
  };

  presisteItemChecklist(){
    this.ngxSpinner.show();
    let createCheckListURL = `${urls.CREATE_CHECKLIST}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    delete this.newlyCreatedCheckList["_id"];
    this.http.Post(createCheckListURL , {} , { "checklist" : this.newlyCreatedCheckList } ).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new checklist item created" , "Wow, Your checklist just created! start the planning! 🎉");
        this.getChecklistsPerUser();
        this.newlyCreatedCheckList = {
          isChecked: false,
          note: "",
          title: "",
          isNew: true,
          _id: "sd"
        }
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't created on the server!");
      }
    })

  };

  updateChecklistItem(id: any){
    this.ngxSpinner.show();
    let targetChecklist = this.listOfUsersChecklists.find(x => x._id == id);
    console.log(targetChecklist)

    let updateChecklistURL = `${urls.UPDATE_CHECKLIST}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(updateChecklistURL , {} , { "checklist" :targetChecklist}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("We've updated your note!" , "Amazing you're doing great keep yourself updated, plane each step! 😍");
        this.getChecklistsPerUser();
      } else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't created on the server!");
      }
    })
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/changeLang.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  async loadResources() {
    const lang =
        window.location.href.toString().toLowerCase().indexOf('ar') > -1
          ? 'ar'
          : 'en';

    const resourceLang =
        lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    const resData = (await this.resources.load(
        resourceLang,
        constants.VIEWS.CHECKLIST
      )) as any;
    this.labels = resData.res;
  }
}
