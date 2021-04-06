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
    isNew: true
  };


  listOfUsersChecklists: checklist[] = [
    {
      id: "12",
      title: "Hire a planner.",
      note: "I'm going to hire a planner.",
      isChecked: false
    }
  ];

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService ,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService) { }

  ngOnInit() {
  }

  toggleNote(id){
    this.showNote = this.showNote == "" ? id : "";
  };

  check(id){
    let targetCheckList = this.listOfUsersChecklists.find(x => x.id == id);
    targetCheckList.isChecked = !targetCheckList.isChecked;
  }

  createNewChecklist(){
    this.listOfUsersChecklists.push(this.newlyCreatedCheckList);
  };

  presisteItemChecklist(){
    this.ngxSpinner.show();
    let currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    let createCheckListURL = `${urls.CREATE_CHECKLIST}/${constants.APP_IDENTITY_FOR_USERS}/${currentUserEmail}`;

    this.http.Post(createCheckListURL , {} , { "checklist" : this.newlyCreatedCheckList } ).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new checklist item created" , "Wow, Your checklist just created! start the planning! 🎉");
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
