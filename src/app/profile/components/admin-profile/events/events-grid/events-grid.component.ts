import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.scss']
})
export class EventsGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewEvent(){
    this.router.navigate(['profile/en/admin/events-action/new']);
  }
}
