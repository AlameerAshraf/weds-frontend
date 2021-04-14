import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { user, constants, urls, httpService, responseModel, localStorageService } from 'src/app/core';
declare var $: any;


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, AfterViewInit {

  date = "";

  editingMode = "new";
  that = this;
  userRoleSelected = "";

  currentUserEmail: string;
  userRoles = constants.USER_ROLES_LIST;

  user: user = {
    age: "",
    password: "Weds360user**",
    accountSource: "WEDS360",
    name: "",
    dateOfBirth: new Date,
    email: "",
    phone: "",
    role: "",
    isAccountLocked: false,
    isActive: true,
    isEmailConfirmed: false,
  };

  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private router: Router,
    private toastr: ToastrService, private http: httpService,
    private activatedRoute: ActivatedRoute, private storage: localStorageService,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }

  ngOnInit() {
    this.loadScripts();
    this.initUserView();
    this.documentSelectors();
  }

  initUserView() {
    if (this.editingMode == "update") {
      this.user = this.storage.getLocalStorage("weds360#userOnEdit");
    }
  };

  createNewEntity() {
    this.ngxSpinner.show();
    let dateValue: any = document.getElementById("date-picker");
    this.user.role = this.userRoleSelected;
    this.calculateAge(dateValue);

    let createURL = `${urls.CREATE_USER}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(createURL, {}, { "user": this.user }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("User has been saved succesfully", "User has been updated, Bingo!");
        this.router.navigateByUrl('/profile/en/admin/users-list');
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your user couldn't created on the server!");
      }
    });
  };

  updateExistingEntity() {
    this.ngxSpinner.show();
    let dateValue: any = document.getElementById("date-picker");
    this.calculateAge(dateValue);
    this.user.role = this.userRoleSelected;

    let updateURL = `${urls.UPDATE_USER}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.user._id}`;
    this.http.Post(updateURL, {}, { "user": this.user }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("User has been saved succesfully", "A user has been updated .");
        this.router.navigateByUrl('/profile/en/admin/users-list');
      } else {
        console.log(response)
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your user couldn't created on the server!");
      }
    });
  };

  documentSelectors() {
    $("#userRolesDropDown").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.userRoleSelected = $("#userRolesDropDown").chosen().val();
    });
  };

  calculateAge(dateValue){
    this.user.dateOfBirth = new Date(dateValue.value);
    var diff = (new Date().getTime() - this.user.dateOfBirth.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    this.user.age = Math.abs(Math.round(diff / 365.25)).toString();
  }

  backToRoute() {
    this.router.navigateByUrl('/profile/en/admin/users-list');
  };

  ngAfterViewInit(): void {
    //this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/datePickerInitakizer.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}



