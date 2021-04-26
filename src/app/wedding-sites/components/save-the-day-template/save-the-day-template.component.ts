import { Router, ActivatedRoute } from '@angular/router';
import { httpService } from './../../../core';
import { weddingTemplatesHelper } from './../../helpers/wedding-templates';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-the-day-template',
  templateUrl: './save-the-day-template.component.html',
  styleUrls: ['./save-the-day-template.component.scss']
})
export class SaveTheDayTemplateComponent implements OnInit {
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
  }

  //#region Helpers
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  };
  //#endregion
}
