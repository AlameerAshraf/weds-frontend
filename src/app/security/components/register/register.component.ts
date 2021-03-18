import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  userRegisterationImage = "assets/images/backgrounds/login/8.png";
  vendorRegisterationImage = "assets/images/backgrounds/login/4_vendor.png";
  bkImage = "";
  isVendorRegistering: boolean;
  lang: any;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private resources: resources) { }

  ngOnInit() {
    this.loadResources();
    this.actictedRoute.queryParams.subscribe((params) => {
      let isVendor = this.isVendorRegistering = params["vendor"];
      this.bkImage = isVendor == undefined ? this.userRegisterationImage : this.vendorRegisterationImage;
    })
  };

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };


  /**
   * Change the type for who is registerating now!
   */
  changeRegisterationType(type: string) {
    if (type == "user") window.location.href = "/security/ar/register";
    else window.location.href = `/security/ar/register?vendor=join`
  };

  /**
   * Change the type for who is registerating now!
   */
  navigateToLogin() {
    this.router.navigateByUrl(`/security/${this.lang}/login`);
  };

  /**
   * Binding scripts to the component.
   */
  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };
}
