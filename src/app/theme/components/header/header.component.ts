import { constants, resources } from 'src/app/core';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'weds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined = false;
  menuItems = [];
  lang: any;
  constructor(private actictedRoute: ActivatedRoute, private resources: resources,
    private router: Router) { }

  ngOnInit() {
    this.loadResources();
  }

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HEADER"]) as any;
    this.menuItems = this.menuItems.concat(resData.res);
  };

  checkViewAuthority(){
    if (this.router.url.includes('authed')) {
      this.isLogined = true;
    }
  };


  navigateToLogin(){
    this.router.navigateByUrl(`/security/${this.lang}/login`)
  };
}
