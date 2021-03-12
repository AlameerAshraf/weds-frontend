import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weds-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentDate = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
