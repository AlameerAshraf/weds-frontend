import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, resources, offer, localStorageService , responseModel , urls , httpService } from 'src/app/core';


@Component({
  selector: 'app-offers-grid',
  templateUrl: './offers-grid.component.html',
  styleUrls: ['./offers-grid.component.scss']
})
export class OffersGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  offersList :  offer[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#offerOnEdit");
  }

  ngOnInit() {
    this.getAllOffers();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllOffers() {
    this.ngxSpinner.show();
    let getAllOffersURL = `${urls.GET_ALL_OFFERS}/${constants.APP_IDENTITY_FOR_USERS}`;


    this.http.Get(getAllOffersURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.offersList = response.data as offer[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };

  pageChange(pageNumber){

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/offers-action/update`]);
    let targetTheme = this.offersList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#offerOnEdit" , targetTheme);
  };

  navigateToCreateNewOffer(){
    this.router.navigate(['profile/en/admin/offers-action/new']);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
