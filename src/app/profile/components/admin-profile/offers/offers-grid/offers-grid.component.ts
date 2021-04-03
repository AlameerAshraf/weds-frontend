import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-grid',
  templateUrl: './offers-grid.component.html',
  styleUrls: ['./offers-grid.component.scss']
})
export class OffersGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewOffer(){
    this.router.navigate(['profile/en/admin/offers-action/new']);
  }

}
