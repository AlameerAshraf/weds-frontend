import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, user, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss']
})
export class UsersGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  usersList: user[] = [];

  userRoles = constants.USER_ROLES_LIST;

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
      this.ngxSpinner.hide();
    } else {
      this.ngxSpinner.hide();
    }
  });
};

  pageChange(pageNumber){

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

}
