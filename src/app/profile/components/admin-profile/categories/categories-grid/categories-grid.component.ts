import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewCategory(){
    this.router.navigate(['profile/en/admin/categories-action/new']);
  }

}
