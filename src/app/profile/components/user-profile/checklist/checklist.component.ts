import { slideInOutAnimation } from './../../../../core/helpers/animations/slideInOutAnimation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  animations: [slideInOutAnimation]
})
export class ChecklistComponent implements OnInit {
  showNote = 0;

  constructor() { }

  ngOnInit() {
  }

  toggleNote(id){
    this.showNote = this.showNote == 0 ? id : 0;
  };
}
