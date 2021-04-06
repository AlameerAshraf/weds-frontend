import { NgxSpinnerService } from 'ngx-spinner';
import { slideInOutAnimation , checklist , urls , httpService , constants , responseModel} from './../../../../core';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService ,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.getChecklistsPerUser();
  }

  getChecklistsPerUser(){
    let getAllChecklists = `${urls.GET_ALL_CHECKLISTS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(getAllChecklists , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.listOfUsersChecklists = response.data as checklist[]
      }else{

      }
    })

  };

  toggleNote(id: any){
    this.showNote = this.showNote == "" ? id : "";
  };

  check(id: any){
    let targetCheckList = this.listOfUsersChecklists.find(x => x._id == id);
    targetCheckList.isChecked = !targetCheckList.isChecked;
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

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/changeLang.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
