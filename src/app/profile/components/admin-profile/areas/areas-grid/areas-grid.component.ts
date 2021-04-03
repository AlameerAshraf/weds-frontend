import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-grid',
  templateUrl: './areas-grid.component.html',
  styleUrls: ['./areas-grid.component.scss']
})
export class AreasGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewArea(){
    this.router.navigate(['profile/en/admin/areas-action/new']);
  }
}
