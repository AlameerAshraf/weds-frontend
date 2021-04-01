import { slideInOutAnimation } from './../../../../core';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss'],
  animations: [slideInOutAnimation]
})
export class BudgeterComponent implements OnInit, AfterViewInit {
  showBudgeter: any = 0;
  budgetItem = false;

  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef, ) { }

  ngOnInit() {
  }

  openBudgeter(id: any){
    console.log(id);
    this.budgetItem = !this.budgetItem;
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
