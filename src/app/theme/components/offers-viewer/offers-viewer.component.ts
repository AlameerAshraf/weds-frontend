import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from 'src/app/core';

@Component({
  selector: 'weds-offer-viewer',
  templateUrl: './offers-viewer.component.html',
  styleUrls: ['./offers-viewer.component.scss']
})
export class OffersViewerComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService) {

  }

  ngOnInit() {
  }
}
