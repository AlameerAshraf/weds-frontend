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

  listOfBudgeters : budgeter[] = [
  ];
  newlyCreatedBudgetItem = {
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
  };

  createBudgeterItem(){
    this.listOfBudgeters.push(this.newlyCreatedBudgetItem);
    this.loadScripts();
  };

  saveBudgeterItem(){
    console.log(this.newlyCreatedBudgetItem);
    this.ngxSpinner.show();
    let createBudgeterItemURL = `${urls.CREATE_BUDGETER_ITEM}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    delete this.newlyCreatedBudgetItem["_id"];
    this.http.Post(createBudgeterItemURL , {} , { "budgetItem" : this.newlyCreatedBudgetItem }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new budget plan!" , "Wow, You've added a new plane good for you. 🎈");
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
