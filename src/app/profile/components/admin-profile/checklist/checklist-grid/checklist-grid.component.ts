import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, checklist, localStorageService , responseModel , urls , httpService } from 'src/app/core';


@Component({
  selector: 'app-checklist-grid',
  templateUrl: './checklist-grid.component.html',
  styleUrls: ['./checklist-grid.component.scss']
})
export class ChecklistGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  checkLists: checklist[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#checkListOnEdit");
}

  ngOnInit() {
    this.getAllCheckLists();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllCheckLists() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_CHECKLISTS_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.checkLists = response.data as checklist[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };


  pageChange(pageNumber){

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/checklist-action/update`]);
    let targetTheme = this.checkLists.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#checkListOnEdit" , targetTheme);
  };

  navigateToCreateNewCheklist(){
    this.router.navigate(['profile/en/admin/checklist-action/new']);
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
