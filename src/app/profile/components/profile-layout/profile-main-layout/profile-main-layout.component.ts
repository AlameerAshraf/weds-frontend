import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { constants, resources } from '../../../../core';

@Component({
  selector: 'app-profile-main-layout',
  templateUrl: './profile-main-layout.component.html',
  styleUrls: ['./profile-main-layout.component.scss']
})
export class ProfileMainLayoutComponent implements OnInit {

  @Input() authorizedUser: boolean = false;

  isLogined = false;
  menuItems = [];
  profileLinks = [];
  navLinks = [];
  lang: any;

  // Languge!
  redierctURL: string;
  langChangerURL: string;
  selectedTitle: any;


  constructor(private actictedRoute: ActivatedRoute, private resources: resources,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private router: Router) { }

  async ngOnInit() {
    this.checkViewAuthority();
    let currentUserType = window.location.href.split('/')[5];

    await this.loadResources(currentUserType);
    this.redierctURL = `/profile/${this.lang}/${currentUserType}/`;
  }

  /** Use this function at each view to load corrosponding resources! */
  async loadResources(currentUserType: string) {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let dashboardNavs = `${currentUserType.toUpperCase()}_DASHBOARD`;

    let resData = await this.resources.load(resourceLang, constants.VIEWS[dashboardNavs]) as any;
    this.menuItems = this.menuItems.concat(resData.res["menu"]);
    this.profileLinks = this.profileLinks.concat(resData.res["actions"]);
    this.navLinks = this.navLinks.concat(resData.res["navigations"]);
  };

  checkViewAuthority(){
    this.isLogined = this.authorizedUser;
  };

  navigateTo(url: any , title: any){
    this.selectedTitle = title;
    // this.router.navigateByUrl();
  };

  ngAfterViewInit(): void {
    // let scripts = ['assets/scripts/custom.js' , 'assets/scripts/changeLang.js'];

    // scripts.forEach(element => {
    //   const s = this.document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = element;
    //   this.elementRef.nativeElement.appendChild(s);
    // });
  };
}


