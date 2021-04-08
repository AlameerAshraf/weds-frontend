import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServicesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  pageChange(pageNumber){

  };

  navigateToCreateNewService(){
    this.router.navigate(['profile/en/vendor/services-action/new']);
  }
}
