import { helper } from './helper/helper';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, resources } from 'src/app/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  translated = {};
  userRegisterationImage = "assets/images/backgrounds/login/8.png";
  vendorRegisterationImage = "assets/images/backgrounds/login/4_vendor.png";
  bkImage = "";
  isVendorRegistering: boolean;
  lang: any;
  passwordHidden = true;

  helpers = new helper(this.router, this.actictedRoute, this.resources);

  // Form variables
  registerForm = null;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private resources: resources, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.actictedRoute.queryParams.subscribe((params) => {
      let isVendor = this.isVendorRegistering = params["vendor"];
      this.bkImage = isVendor == undefined ? this.userRegisterationImage : this.vendorRegisterationImage;
    });

    let resourcesData = await this.helpers.loadResources();
    this.lang = resourcesData.lang;
    this.translated = resourcesData.translatedObject;
  };

  /** Form functions */
  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  };
  get rf() {
    return this.registerForm.controls;
  };

  /** toggle password. */
  togglePassword() {
    this.passwordHidden = !this.passwordHidden;
  };

  /** Register current user */
  register() {
    console.log("register")
  };

  /** Binding scripts to the component. */
  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };
}
