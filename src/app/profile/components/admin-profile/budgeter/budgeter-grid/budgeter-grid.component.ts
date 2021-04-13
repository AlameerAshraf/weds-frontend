import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, budgeter, localStorageService , responseModel , urls , httpService } from 'src/app/core';


@Component({
  selector: 'app-budgeter-grid',
  templateUrl: './budgeter-grid.component.html',
  styleUrls: ['./budgeter-grid.component.scss']
})
export class BudgeterGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  budgetersList: budgeter[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#budgeterOnEdit");
}

  ngOnInit() {
    this.getAllBudgeters();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllBudgeters() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_BUDGETER_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.budgetersList = response.data as budgeter[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };


  pageChange(pageNumber){

  };

  
  editEntity(id: any){
    this.router.navigate([`profile/en/admin/budgeter-action/update`]);
    let targetTheme = this.budgetersList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#budgeterOnEdit" , targetTheme);
  };

  navigateToCreateNewBudgeter(){
    this.router.navigate(['profile/en/admin/budgeter-action/new']);
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
