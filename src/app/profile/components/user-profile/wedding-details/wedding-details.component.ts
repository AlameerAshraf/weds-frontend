import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding-details',
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef,) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
