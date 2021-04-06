import { constants, slideInOutAnimation , budgeter, urls , httpService , responseModel} from './../../../../core';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
  animations: [slideInOutAnimation]
})
export class BudgeterComponent implements OnInit {
  budgetItem = "";

  listOfBudgeters: budgeter[] = [
  ];
  newlyCreatedBudgetItem: budgeter = {
    isNew: true,
    amount: 0,
    description: "",
    name: "",
    recommendedPercentage: 0,
    _id: "new",
    vendor : {
      vendorId: "606b7e6d29485531bcbbb76b",
      amountSpent: 0,
      note : ""
    }
  };

  showBudgeter: any = 0;
  that = this;
  budgetCategory = "";
  budgetAmount = "";
  currentUserEmail: string;

  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef,
    private http: httpService , private ngxSpinner: NgxSpinnerService , private toastr: ToastrService){
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
    this.loadScripts();
    this.documentSelectors();
    this.getAllBudgetItems();
  };

  getAllBudgetItems(){
    this.ngxSpinner.show();
    let budgetItemsURL = `${urls.GET_ALL_BUDGET_ITEMS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Get(budgetItemsURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.listOfBudgeters = response.data as budgeter[];
        this.loadScripts();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your budegeters.");
      }
    })
  };

  createBudgeterItem(){
    this.listOfBudgeters.push(this.newlyCreatedBudgetItem);
    this.loadScripts();
  };

  saveBudgeterItem(){
    this.ngxSpinner.show();
    let createBudgeterItemURL = `${urls.CREATE_BUDGETER_ITEM}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    delete this.newlyCreatedBudgetItem["_id"];
    this.http.Post(createBudgeterItemURL , {} , { "budgetItem" : this.newlyCreatedBudgetItem }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new budget plan!" , "Wow, You've added a new plane good for you. 🎈");
        this.getAllBudgetItems();
        this.newlyCreatedBudgetItem = {
          amount: 0,
          description: "",
          name: "",
          recommendedPercentage: 0,
          _id: "new",
          vendor : {
            vendorId: "newVendor",
            amountSpent: 0,
            note : ""
          }
        };
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your plan couldn't created on the server!");
      }
    });
  };

  updateBudgeterItem(id: any){
    this.ngxSpinner.show();
    let updateBudgeterItemURL = `${urls.UPDATE_BUDGETER_ITEM}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    let targetBudgter = this.listOfBudgeters.find(x => x._id == id);

    this.http.Post(updateBudgeterItemURL , {} , { "budgetItem" : targetBudgter }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new budget plan!" , "Wow, we've updated a budgter item.");
        this.getAllBudgetItems();
      } else {
        this.ngxSpinner.hide();
        this.toastr.success("Our bad sorry!" , "Ooh Sorry, your plan couldn't created on the server!");
      }
    });
  };

  openBudgeter(id: any){
    this.budgetItem = this.budgetItem == "" ? id : "";
  };

  plan(amount: Number){
    console.log(amount)
  };

  documentSelectors(){
    $("#budgetCategory").change({ angularThis: this.that } ,function(e, params){
      var suggestedBudgetElement: any = document.getElementById("suggestedBudget");
      var suggestedBudgetValue = constants.SUGGESTED_BUDGET_VALUES[$("#budgetCategory").chosen().val()];

      e.data.angularThis.budgetCategory = $("#budgetCategory").chosen().val();
      suggestedBudgetElement.value = suggestedBudgetValue;
      e.data.angularThis.plan(suggestedBudgetValue);
    });
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
}
