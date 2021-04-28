import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { httpService, registery, weddingWebsite } from 'src/app/core';
import { weddingTemplatesHelper } from '../../helpers';

@Component({
  selector: 'app-spring-garden',
  templateUrl: './spring-garden.component.html',
  styleUrls: ['./spring-garden.component.scss']
})
export class SpringGardenComponent implements OnInit {
  helper: weddingTemplatesHelper;
  routingURL: any;
  weddingData: any;
  ownerData: any;
  userInfo: any;
  websiteData: weddingWebsite = new weddingWebsite();
  weddingTime: string;
  preMartialWeddingTime: string;
  registryList: registery[] = [];

  constructor(private httpService: httpService , private router: Router, private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.routingURL = params["me"];
    });


    this.helper = new weddingTemplatesHelper(this.httpService , this.router);
    this.weddingData = await this.helper.getWeddingWebisteData(this.routingURL) as any;

    this.websiteData = this.weddingData["wedding"].website as weddingWebsite;
    this.userInfo = this.weddingData["user"];
    this.helper.getWeddingWebsiteOwner(this.routingURL);

    this.weddingTime = new Date(this.websiteData.weddingTime).toDateString();
    this.preMartialWeddingTime = new Date(this.websiteData.preWeddingMaritalCeremony).toDateString();
    this.registryList = this.weddingData["wedding"].registery as registery[];

    this.titleService.setTitle(`${this.userInfo.name} & ${this.userInfo.partener.name} ❤ are getting married!`);

    console.log(this.weddingData["wedding"] , this.websiteData)
  }

  //#region Helpers
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  };
  //#endregion
}
