import { constants, resources } from 'src/app/core';
import { Component, ElementRef, Inject, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'weds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() authorizedUser: boolean = false;
  @Input() urlSegment = ''
  @Input() type = ''

  isLogined = false;
  menuItems = [];
  profileLinks = [];
  lang: any;

  // Languge!
  loginURL: string;
  langChangerURL: string;


  constructor(private actictedRoute: ActivatedRoute, private resources: resources,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private router: Router) { }

  ngOnInit() {
    this.loadResources();
    this.checkViewAuthority();
    this.loginURL = `/security/${this.lang}/login`;
  }

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HEADER"]) as any;
    this.menuItems = this.menuItems.concat(resData.res["menu"]);
    this.profileLinks = this.profileLinks.concat(resData.res["actions"]);
  };

  checkViewAuthority(){
    this.isLogined = this.authorizedUser;
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/changeLang.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
