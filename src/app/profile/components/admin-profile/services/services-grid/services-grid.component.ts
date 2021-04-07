import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.scss']
})
export class ServicesGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  pageChange(pageNumber){

  };

  navigateToCreateNewService(){
    this.router.navigate(['profile/en/admin/services-action/new']);
  }

}
