import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, checklist, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checklist-grid',
  templateUrl: './checklist-grid.component.html',
  styleUrls: ['./checklist-grid.component.scss']
})
export class ChecklistGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  checkLists: checklist[] = [];

  labels: any = {};
  lang: string;
  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#checkListOnEdit");
}

  ngOnInit() {
    this.getAllCheckLists();
  }



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
    this.router.navigate([`profile/${this.lang}/admin/checklist-action/update`]);
    let targetTheme = this.checkLists.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#checkListOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_CHECKLIST_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Checklist has been deleted succesfully" , "An checklist has been deleted and wedding website will be impacted.");
        this.getAllCheckLists();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewCheklist(){
    this.router.navigate([`profile/${this.lang}/admin/checklist-action/new`]);
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
  async loadResources() {
    const lang =
        window.location.href.toString().toLowerCase().indexOf('ar') > -1
          ? 'ar'
          : 'en';

    const resourceLang =
        lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    const resData = (await this.resources.load(
        resourceLang,
        constants.VIEWS['CHECKLIST']
      )) as any;
    this.labels = resData.res;
  }

}
