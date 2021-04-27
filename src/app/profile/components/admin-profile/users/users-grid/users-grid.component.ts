import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, user, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
declare var $

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss']
})
export class UsersGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  usersList: user[] = [];

  userRoles = constants.USER_ROLES_LIST;

     // Paging vars!
     collectionSize: number = 0;
     pageSize: any = 5;
     limit: number;
     skip: number;
     showPaging = true;
     // End paging vars!
   
     // Search vars!
     searchableList : user[] = [];
     selectedSearchRole: string = "";
     searchKey = undefined;
     that: any = this;
     // End search vars!

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#userOnEdit");
}

ngOnInit() {
  this.getAllUsers();
  this.documentSelectors();
}

async loadResources() {
  let providedlang: any = this.actictedRoute.parent.params;
  let lang = providedlang._value["lang"];
  let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

  let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
};

getAllUsers() {
  this.ngxSpinner.show();
  let getAllUsersURL = `${urls.GET_ALL_USERS}/${constants.APP_IDENTITY_FOR_USERS}`;

  this.http.Get(getAllUsersURL, {}).subscribe((response: responseModel) => {
    if (!response.error) {
      this.usersList = response.data as user[];
      this.usersList = this.searchableList = this.usersList.filter(x => x.isActive == true);
        this.collectionSize = this.usersList.length;
        this.pageChange(1);
      this.ngxSpinner.hide();
    } else {
      this.ngxSpinner.hide();
    }
  });
};

documentSelectors() {
  $("#userRolesDropDown").change({ angularThis: this.that }, function (e, params) {
    e.data.angularThis.selectedSearchRole = $("#userRolesDropDown").chosen().val();
  });
};

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/users-action/update`]);
    let targetItem = this.usersList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#userOnEdit" , targetItem);
  };

  deleteEntity(email: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_USER}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(deleteURL , {} , {"userEmail" : email }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("User has been deleted succesfully" , "An user has been deleted and wedding website will be impacted.");
        this.getAllUsers();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your user couldn't deleted on the server!");
      }
    });
  };

  navigateToAddNewUser(){
    this.router.navigate(['profile/en/admin/users-action/new']);
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

  //#search region functions 
  search(){
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.usersList.filter((aUser) => {
      return (aUser.role == this.selectedSearchRole)
        || (aUser.name.includes(this.searchKey));
    });

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.searchableList.length;
    }, 0);
  };

  clearSearch(){
    this.showPaging = false;
    this.ngxSpinner.show();
    window.scroll(0,0);
    this.searchableList = this.usersList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.usersList.length;
      this.searchKey = undefined;
    }, 0);

  };
//#endregion

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion

}
