import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants, httpService, offer, responseModel, urls,resources } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'weds-offer-viewer',
  templateUrl: './offers-viewer.component.html',
  styleUrls: ['./offers-viewer.component.scss']
})
export class OffersViewerComponent implements OnInit {
  @Input() residesIn = "";
  imageObject: Array<any> = [];
  lang: string;
  listOfOffers: offer[] = [];
  labels: any;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any,private resources: resources,
    private elementRef: ElementRef, private http: httpService, private ngxSpinner: NgxSpinnerService) {

  }

  ngOnInit() {
    // searhc in db, load all offers with this residesIn tag
    // load all offers
    this.loadAllOffers();
    this.loadResources();
  }

  loadAllOffers() {
    this.ngxSpinner.show();
    let getAllOffers = `${urls.GET_ALL_OFFERS}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllOffers, {'residesIn' : this.residesIn}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.listOfOffers = response.data as offer[];
        this.fillOffersData(this.listOfOffers);
      } else {
        this.ngxSpinner.hide();
      }
    })
  };

  fillOffersData(listOfOffers) {
    for (let index = 0; index < listOfOffers.length; index++) {
      if (this.lang == "en") {
        this.imageObject.push(
          {
            index: index,
            image: listOfOffers[index].image,
            thumbImage: listOfOffers[index].image,
            alt: listOfOffers[index].titleEn,
            title: listOfOffers[index].titleEn,
            redierctURL: listOfOffers[index].vendor != null ? listOfOffers[index].vendor : null,
          }
        )
      }
      else {
        this.imageObject.push(
          {
            index: index,
            image: listOfOffers[index].image,
            thumbImage: listOfOffers[index].image,
            alt: listOfOffers[index].titleAr,
            title: listOfOffers[index].titleAr,
            redierctURL: listOfOffers[index].vendor != null ? listOfOffers[index].vendor : null,
          }
        )
      }
    }
  }


  openOffer(imageIndex: any) {
    // TODO: NAVIGATE TO THE VENMDOR PAGE!
    let offer = this.imageObject.find(x => x.index == imageIndex);
    window.open(`/segment/en/vendor/${offer.redierctURL}`);
  }

  async loadResources() {
    const lang =
        window.location.href.toString().toLowerCase().indexOf('ar') > -1
          ? 'ar'
          : 'en';

    const resourceLang =
        lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    const resData = (await this.resources.load(
        resourceLang,
        constants.VIEWS['OFFERS']
      )) as any;
    this.labels = resData.res;
  }
}
