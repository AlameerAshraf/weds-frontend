import { urls, resources, httpService, constants, responseModel, social, errorBuilder, user, localStorageService } from './../../../core';
import { helper } from './helper/helper';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

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
  hasErrors = false;
  hasWarnings = false;
  hasInfo = false;
  hasSuccessMessages = false;
  showNotification = false;

  helpers = new helper(this.router, this.actictedRoute, this.resources);

  // Form variables
  registerForm: FormGroup = null;
  labels: any = {};
  socialUser: {
    name: any;
    password: string; role: string; email: any; accountSource: any; isActive: boolean; settings: { avatar: any; };
  };

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private elementRef: ElementRef, private actictedRoute: ActivatedRoute, private storage: localStorageService,
    private resources: resources, private formBuilder: FormBuilder, private OAuth: SocialAuthService,
    private httpService: httpService, private spinner: NgxSpinnerService) {
      this.storage.eraseAllLocalStorage();
    }

  async ngOnInit() {
    this.initForm();
    this.loadResources();
    this.actictedRoute.queryParams.subscribe((params) => {
      let isVendor = this.isVendorRegistering = params["vendor"];
      this.bkImage = isVendor == undefined ? this.userRegisterationImage : this.vendorRegisterationImage;
    });

    let resourcesData = await this.helpers.loadResources();
    this.lang = resourcesData.lang;
    this.translated = resourcesData.translatedObject;

    this.OAuth.authState.subscribe((user) => {
      this.setSocialLoginData(user);
    });
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

  /**Get the Long&Lat location info */
  getGeoLocationInfo() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((locationInfo) => {
          let lat = locationInfo.coords.latitude;
          let long = locationInfo.coords.longitude;

          let address = { address: { latitude: lat, longtitude: long } };
          resolve(address);
        }, (err) => {
          let address = { address: { latitude: 0, longtitude: 0 } };
          resolve(address);
        })
      } else {
        //TODO: Implememnt a generic alert function!
        alert("Error Finding user location!");
        let address = { address: { latitude: "", longtitude: "" } };
        resolve(address);
      }
    })
  };

  //** Prepare all needed data from the current form! */
  async getFormData() {
    let geoLocationData: any = await this.getGeoLocationInfo();
    let formData = this.registerForm.value;
    let accountSource = { accountSource: constants.ACCOUNT_SOURCES.WEDS360 };
    let userRole = this.isVendorRegistering ? { role: constants.USER_ROLES.VENDOR } : { role: constants.USER_ROLES.USER };

    let result = { ...formData, ...geoLocationData, ...accountSource, ...userRole };
    return result;
  };

  async setSocialLoginData(user: any) {
    let geoLocationData: any = await this.getGeoLocationInfo();
    let userData = {
      "name": user.name,
      "password": "01060931989Aa**",
      "role": this.isVendorRegistering ? constants.USER_ROLES.VENDOR : constants.USER_ROLES.USER,
      "email": user.email,
      "accountSource": user.provider,
      "isActive": true,
      "settings": {
        "avatar": user.photoUrl
      },
      ...geoLocationData
    };

    this.socialUser = userData;
    await this.socialRegisteration();
  };

  /** Register current user */
  async register() {
    this.spinner.show();
    let signUpURL = `${urls.USER_SIGN_UP}/${constants.APP_IDENTITY_FOR_USERS}`;
    let userData = await this.getFormData();

    this.httpService.Post(signUpURL, {}, { "user": userData }).subscribe((response: responseModel) => {
      this.spinner.hide();
      if (!response.error) {
        this.helpers.navigateToLogin();
      } else {
        let errors = errorBuilder.build(response.details);
        if (errors !== undefined)
          this.buildErrorsInView(errors);
        else
          this.buildErrorsInView([{ message: response.details }]);
      }
    });
  };

  async socialRegisteration() {
    this.spinner.show();
    let signUpURL = `${urls.SOCIAL_LOGGING}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.httpService.Post(signUpURL, {}, { "user": this.socialUser }).subscribe((response: responseModel) => {
      this.spinner.hide();
      if (!response.error) {
        debugger
        this.setUserDataInStorage(response.data);
        this.router.navigateByUrl(`/${this.lang}/home`);
      } else {
        let errors = errorBuilder.build(response.details);
        if (errors !== undefined)
          this.buildErrorsInView(errors);
        else
          this.buildErrorsInView([{ message: response.details }]);
      }
    });
  };

  setUserDataInStorage(user) {
    let savedUserData = user["user"] as user;
    this.storage.setLocalStorage('weds360#data', user.token);
    this.storage.setLocalStorage('weds360#name', savedUserData.name);
    this.storage.setLocalStorage('weds360#role', btoa(savedUserData.role));
    this.storage.setLocalStorage('weds360#avatar', savedUserData.settings.avatar);
    this.storage.setLocalStorage('weds360#email', btoa(savedUserData.email));
    this.storage.setLocalStorage('weds360#id', btoa(savedUserData._id));
  };

  signInWithFB(): void {
    this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

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
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = (this.lang =
      lang == null || lang == undefined ? environment.defaultLang : lang);
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["LOGIN"]
    )) as any;
    this.labels = resData.res;
  }
  changeLanguge() {
    const baseUrl = window.location.href.toString().toLowerCase();
    const isArabic = this.lang === 'ar';
    const url = isArabic ? baseUrl.replace('/ar/', '/en/') : baseUrl.replace('/en/', '/ar/')
    window.location.href = url
  }

}
