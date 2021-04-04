import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit , AfterViewInit{

  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef, private router: Router) { }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
  };

  viewEventDetails(){
    this.router.navigateByUrl('/profile/en/user/event-details/25')
  };
}
