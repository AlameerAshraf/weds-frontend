import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile-details',
  templateUrl: './admin-profile-details.component.html',
  styleUrls: ['./admin-profile-details.component.scss']
})
export class AdminProfileDetailsComponent implements OnInit, AfterViewInit {
  coverPhotoSource: string | ArrayBuffer = ''

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
