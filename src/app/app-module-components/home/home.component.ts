import { Component, OnInit } from '@angular/core';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { constants, resources } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Animation variables!
  startTypingAnimation: boolean = true;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef) {
      // this.resources.load("ar" , "home");
      console.log(constants.BASE_URL);
  }


  ngOnInit() {
  };

  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/typedwords.js';
    this.elementRef.nativeElement.appendChild(s);
  };
}
