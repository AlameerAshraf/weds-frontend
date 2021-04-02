import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgeter-grid',
  templateUrl: './budgeter-grid.component.html',
  styleUrls: ['./budgeter-grid.component.scss']
})
export class BudgeterGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewBudgeter(){
    this.router.navigate(['profile/en/admin/budgeter-action/new']);
  }
}
