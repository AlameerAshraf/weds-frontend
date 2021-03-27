import { httpService ,  resources , urls , constants , responseModel, errorBuilder , localStorageService } from './../../../core';
import { helper } from './helper/helper';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
  hasErrors = false;
  hasWarnings = false;
  hasInfo = false;
  hasSuccessMessages = false;
  showNotification = false;

  // Form variables!
  loginForm: FormGroup;
  helpers = new helper(this.router , this.actictedRoute , this.resources );
  translated: any = {};

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute,
    private storage: localStorageService, private spinner: NgxSpinnerService,
    private resources: resources, private formBuilder: FormBuilder, private http: httpService) { }

  async ngOnInit() {
    this.initForm();

    let resourcesData = await this.helpers.loadResources();
    this.lang = resourcesData.lang;
    this.translated = resourcesData.translatedObject;
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

  //** Prepare all needed data from the current form! */
  getFormData(){
    let formData = this.loginForm.value;

    let result = { ...formData };
    return result;
  };


  /** Login current user to weds360! */
  login(){
    this.spinner.show();
    let loginURL = `${urls.USER_SIGN_IN}/${constants.APP_IDENTITY_FOR_USERS}`;
    let userCredentials = this.getFormData();
    this.http.Post(loginURL , {} , { userCredentials: userCredentials }).subscribe((response: responseModel) => {
      this.spinner.hide();
      if(!response.error){
        this.storage.setCookie('weds360#data' , response.data.token , '' , '');
        this.storage.setLocalStorage('weds360#name' , response.data.info.name);
        this.storage.setLocalStorage('weds360#role' , btoa(response.data.info.name));
        this.storage.setLocalStorage('weds360#avatar' , response.data.info.avatar);
        this.storage.setLocalStorage('weds360#email' , btoa(response.data.info.email));
      } else {
        let errors = errorBuilder.build(response.details);
        if(errors !== undefined)
          this.buildErrorsInView(errors);
        else
          this.buildErrorsInView([ { message : response.details } ]);
      }
    })
  };

  //#region Binding scripts to the component.
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

    document.getElementById('notifyMessage').innerHTML = `<ul style="list-style-type:none;margin: 0px;padding: 0px;"> ${errorBody} </ul>`;;
  };

  textChanged() {
    this.showNotification = false;
  }
  //#endregion
}
