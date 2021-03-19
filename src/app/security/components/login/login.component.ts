import { FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  bkImage = "assets/images/backgrounds/login/9.jpg";
  isVendorRegistering: boolean;
  lang: any;
  passwordHidden = true;

  // Form variables!
  loginForm;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private resources: resources, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadResources();
    this.initForm();
  };

  /** Form functions */
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  };
  get lf() {
    return this.loginForm.controls;
  };

  /** toggle password. */
  togglePassword() {
    this.passwordHidden = !this.passwordHidden;
  };


  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  /** Navigate to the register page.*/
  navigateToRegister() {
    this.router.navigateByUrl(`/security/${this.lang}/register`);
  };

  /** Binding scripts to the component.*/
  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };

  /** Login current user to weds360! */
  login(){
    console.log("Now")
  };

}
