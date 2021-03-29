import { slideInOutAnimation } from './../../../core';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  animations: [slideInOutAnimation]
})
export class SegmentComponent implements OnInit {
  isSearchExpanded = false;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  showCategories(event){
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  }
}
