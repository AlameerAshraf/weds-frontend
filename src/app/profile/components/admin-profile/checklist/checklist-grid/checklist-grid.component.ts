import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checklist-grid',
  templateUrl: './checklist-grid.component.html',
  styleUrls: ['./checklist-grid.component.scss']
})
export class ChecklistGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewCheklist(){
    this.router.navigate(['profile/en/admin/checklist-action/new']);
  }
}
