import { slideInOutAnimation } from './../../../../core/helpers/animations/slideInOutAnimation';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  animations: [slideInOutAnimation]
})
export class ChecklistComponent implements OnInit, AfterViewInit {
  showNote = 0;

  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  toggleNote(id){
    this.showNote = this.showNote == 0 ? id : 0;
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/changeLang.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
