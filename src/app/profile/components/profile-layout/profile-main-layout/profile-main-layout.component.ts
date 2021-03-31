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

    let resData = await this.resources.load(resourceLang, constants.VIEWS["USER_DASHBOARD"]) as any;
    this.menuItems = this.menuItems.concat(resData.res["menu"]);
    this.profileLinks = this.profileLinks.concat(resData.res["actions"]);
    this.navLinks = this.navLinks.concat(resData.res["navigations"]);
  };

  checkViewAuthority(){
    this.isLogined = this.authorizedUser;
  };

  navigateTo(url: any){
    this.router.navigateByUrl(`/profile/${this.lang}/user/${url}`)
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


