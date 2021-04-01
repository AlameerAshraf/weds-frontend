import { slideInOutAnimation } from './../../../../core';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
  animations: [slideInOutAnimation]
})
export class BudgeterComponent implements OnInit {
  showBudgeter: any = 0;
  budgetItem = false;

  constructor(){

  }

  ngOnInit() {
  }

  openBudgeter(id: any){
    console.log(id);
    this.budgetItem = !this.budgetItem;
  }
}
