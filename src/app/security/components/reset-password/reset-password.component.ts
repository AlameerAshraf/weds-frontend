import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { helper } from './../register/helper/helper';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, httpService, resources, responseModel, urls } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  translated = {};
  bkImage: string = 'assets/images/backgrounds/login/11.jpg';
  lang: any;
  requestEmailForm: FormGroup = null;
  resetPasswordForm: any = null;
  passwordHidden = true;

  // Logic variables
  emailSent: boolean = false;
  emailNotValid: boolean = false;
  resetView: string;
  helpers = new helper(this.router , this.actictedRoute , this.resources);

  hasErrors = false;
  hasWarnings = false;
  hasInfo = false;
  hasSuccessMessages = false;
  showNotification = false;
  reset : { email?: string, oldPassword?: string , newPassword?: string , confirmNewPassword?: string, resetToken?: string } = {};
  resetToken: any;

  constructor(@Inject(DOCUMENT) private document: any, //private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private router: Router, private http: httpService, private toaster: ToastrService, private ngxSpinner: NgxSpinnerService,
    private resources: resources, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.initResetPasswordForm();
    this.getResetPasswordView();

    let resourcesData = await this.helpers.loadResources();
    this.lang = resourcesData.lang;
    this.translated = resourcesData.translatedObject;
  };

  /** Get the status of the reset view 1- reset view email request, 2- reset password view. based on the routes */
  getResetPasswordView(){
    this.actictedRoute.params.subscribe((params) => {
      let userToken = params["token"];
      this.resetToken = userToken;
      this.resetView = (userToken == undefined) ? 'email-request' : 'password-reset';
    })
  };

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
      // oldPassowrd: ['', Validators.required],
      newPassowrd: ['', Validators.required],
    });
  };
  get resetf() {
    return this.resetPasswordForm.controls;
  };

  /** toggle password. */
  togglePassword(){
    this.passwordHidden = !this.passwordHidden;
  };

  /** Request password reset email. */
  requesrPasswordReset(){
    this.ngxSpinner.show();
    this.requestEmailForm.value;
    let requestResetPasswordURL = `${urls.REQUEST_RESEt_USER_PASSSWORD}/${constants.APP_IDENTITY_FOR_USERS}/${this.requestEmailForm.value["email"]}`;

    this.http.Post(requestResetPasswordURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        if(response.EMAIL.SENT){
          this.emailSent = true
          this.emailNotValid = false
          this.requestEmailForm.get('email').setValue('');
        }
      }else{
        this.emailNotValid = true
        this.ngxSpinner.hide();
        this.requestEmailForm.get('email').setValue('');
      }
    })
  };

  resetPassword() {
    this.ngxSpinner.show();
    let resetUserPasswordURL = `${urls.RESEt_USER_PASSSWORD}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.reset.resetToken = this.resetToken;
    this.reset.newPassword = this.resetPasswordForm.value["newPassowrd"];
    this.http.Post(resetUserPasswordURL, { "mode": "email" }, { "resetData": this.reset }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.reset.newPassword = "";
        this.router.navigateByUrl(`/security/${this.lang}/login`);
        this.toaster.success("We've updated your password!", "Okay done, password changed successfully.");
      } else {
        this.ngxSpinner.hide();
        this.toaster.error("Our bad sorry!", "Ooh Sorry, maube you misstyped your password, try again!");
      }
    })
  };


  //#region Binding scripts to the component...
  ngAfterViewInit(): void {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  };
  //#endregion

  //#region Build Errors ..
  buildErrorsInView(errors) {
    this.showNotification = this.hasErrors = true;
    let errorBody = '';

    errors.forEach(anError => {
      errorBody = errorBody + `<li> ${anError.message} </li>`;
    });

    document.getElementById('notifyMessage').innerHTML = `<ul> ${errorBody} </ul>`;;
  };

  textChanged(){
    this.showNotification = false;
  }
  //#endregion

}
