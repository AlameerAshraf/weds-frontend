import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { httpService } from 'src/app/core';
import { weddingTemplatesHelper } from '../../helpers';

@Component({
  selector: 'app-violet-flower',
  templateUrl: './violet-flower.component.html',
  styleUrls: ['./violet-flower.component.scss']
})
export class VioletFlowerComponent implements OnInit {
  helper: weddingTemplatesHelper;
  routingURL: any;

  constructor(private httpService: httpService , private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.routingURL = params["me"];
    });


    this.helper = new weddingTemplatesHelper(this.httpService , this.router);
    this.helper.getWeddingWebsiteOwner(this.routingURL);
    let weddingData = this.helper.getWeddingWebisteData(this.routingURL)
  }

  //#region Helpers
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  };
  //#endregion
}
