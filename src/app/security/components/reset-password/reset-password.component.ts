import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  bkImage: string = 'assets/images/backgrounds/login/11.jpg';
  lang: any;
  requestEmailForm: any = null;
  resetPasswordForm: any = null;
  passwordHidden = true;

  // Logic variables
  emailSent: boolean = false;
  resetView: string;


  constructor(@Inject(DOCUMENT) private document: any, //private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private resources: resources, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadResources();
    this.initForm();
    this.initResetPasswordForm();
    this.getResetPasswordView();
  };

  /** Get the status of the reset view 1- reset view email request, 2- reset password view. based on the routes */
  getResetPasswordView(){
    this.actictedRoute.params.subscribe((params) => {
      let userToken = params["token"];
      this.resetView = (userToken == undefined) ? 'email-request' : 'password-reset';
    })
  }

  /** Form functions */
  initForm() {
    this.requestEmailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])]
    });
  };
  get rpf() {
    return this.requestEmailForm.controls;
  };

  /** Form functions */
  initResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassowrd: ['', Validators.required],
      newPassowrd: ['', Validators.required],
    });
  };
  get resetf() {
    return this.resetPasswordForm.controls;
  };

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  /** Binding scripts to the component.*/
  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };

  /** toggle password. */
  togglePassword(){
    this.passwordHidden = !this.passwordHidden;
  };

  /** Request password reset email. */
  resetMyPassword(){

  };
}
