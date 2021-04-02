import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wedding-website',
  templateUrl: './wedding-website.component.html',
  styleUrls: ['./wedding-website.component.scss'],
})
export class WeddingWebsiteComponent implements OnInit {
  is = false;
  constructor() { }

  ngOnInit() {
  }

  selectTemplate(e){
    e.preventDefault();
    this.is = !this.is;
    let like = document.getElementById('template1');
    if(!this.is){
      like.classList.add("liked");
    } else {
      like.classList.remove("liked");
    }
  }
}
