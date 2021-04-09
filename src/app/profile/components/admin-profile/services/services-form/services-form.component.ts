import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {

  currentService = "ring";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreateNewDress() {
    this.router.navigate(['profile/en/admin/services-dress-action/new']);
  }

  navigateToCreateNewRing() {
    this.router.navigate(['profile/en/admin/services-ring-action/new']);
  }

  addNewServiceTemplate() {
    alert("this feature not implamented yet")
  }
}
