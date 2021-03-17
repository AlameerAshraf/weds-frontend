import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
  private elementRef: ElementRef , private actictedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actictedRoute.queryParams.subscribe((params) => {
      let isVendor = this.isVendorRegistering = params["vendor"];
      this.bkImage = isVendor == undefined ? this.userRegisterationImage : this.vendorRegisterationImage;
    })
  };

  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };

  changeRegisterationType(type){
    if(type == "user") window.location.href = "/security/ar/register";
    else window.location.href = `/security/ar/register?vendor=join`
  };
}
