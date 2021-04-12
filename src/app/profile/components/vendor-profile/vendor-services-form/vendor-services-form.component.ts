import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-services-form',
  templateUrl: './vendor-services-form.component.html',
  styleUrls: ['./vendor-services-form.component.scss']
})
export class VendorServicesFormComponent implements OnInit {

  currentService = "dress";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreateNewDress(){
    this.router.navigate(['profile/en/vendor/vendor-services-dress-action/new']);
  }

  navigateToCreateNewRing(){
    this.router.navigate(['profile/en/vendor/vendor-services-ring-action/new']);
  }

  addNewServiceTemplate(){
    alert("this feature not implamented yet")
  }

}
