import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, theme, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-themes-grid',
  templateUrl: './themes-grid.component.html',
  styleUrls: ['./themes-grid.component.scss']
})
export class ThemesGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  themesList: theme[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
      this.loadResources();
      this.storage.eraseLocalStorage("weds360#themeOnEdit");
  }

  ngOnInit() {
    this.getAllThemes();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllThemes() {
    this.ngxSpinner.show();
    let getAllThemesURL = `${urls.GET_ALL_THEMES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllThemesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.themesList = response.data as theme[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  pageChange(pageNumber: any) {

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/themes-action/update`]);
    let targetTheme = this.themesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#themeOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_THEME}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Theme has been deleted succesfully" , "An theme has been deleted and wedding website will be impacted.");
        this.getAllThemes();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your theme couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewTheme() {
    this.router.navigate(['profile/en/admin/themes-action/new']);
  };

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
