import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-the-day-template',
  templateUrl: './save-the-day-template.component.html',
  styleUrls: ['./save-the-day-template.component.scss']
})
export class SaveTheDayTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
