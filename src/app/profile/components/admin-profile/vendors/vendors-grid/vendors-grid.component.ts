import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendors-grid',
  templateUrl: './vendors-grid.component.html',
  styleUrls: ['./vendors-grid.component.scss']
})
export class VendorsGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  pageChange(pageNumber){

  };

  navigateToCreateNewVendor(){
    this.router.navigate(['profile/en/admin/vendors-action/new']);
  }

}
