import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from 'src/app/core';

@Component({
  selector: 'weds-offer-viewer',
  templateUrl: './offers-viewer.component.html',
  styleUrls: ['./offers-viewer.component.scss']
})
export class OffersViewerComponent implements OnInit {
  @Input() residesIn = "";
  imageObject: Array<any> = [];

  constructor(private router: Router, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService) {

  }

  ngOnInit() {
    console.log(this.residesIn)
    // searhc in db, load all offers with this residesIn tag
    // load all offers
    this.loadAllOffers();
  }

  loadAllOffers(){
    for (let index = 0; index < 10; index++) {
      this.imageObject.push(
        {
          index: index,
          image: "../../../../assets/images/backgrounds/landing pages/budgeter.jpg",
          thumbImage: "../../../../assets/images/backgrounds/landing pages/budgeter.jpg",
          alt: "Images Your " + index,
          title: "Images Your",
          redierctURL: null,
        }
      )
    }
  };


  openOffer(imageIndex: any){
    let offer = this.imageObject.find(x => x.index == imageIndex);
    console.log(offer);

    // TODO: NAVIGATE TO THE VENMDOR PAGE!
  }
}
