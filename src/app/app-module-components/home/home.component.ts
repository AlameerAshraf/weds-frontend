import { Component, OnInit } from '@angular/core';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { constants, resources } from 'src/app/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Animation variables!
  startTypingAnimation: boolean = true;

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private resources: resources,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
  }


  ngOnInit() {
  };

  /** Use this function at each view to load corrosponding resources! */
  async loadResources(){
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang , constants.VIEWS["HOME_LAYOUT"]);
  };
}
