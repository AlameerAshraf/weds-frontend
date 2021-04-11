import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, resources, tag, localStorageService , responseModel , urls , httpService } from 'src/app/core';


@Component({
  selector: 'app-tags-grid',
  templateUrl: './tags-grid.component.html',
  styleUrls: ['./tags-grid.component.scss']
})
export class TagsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  tagsList: tag[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
      this.loadResources();
      this.storage.eraseLocalStorage("weds360#tagOnEdit");
  }

  ngOnInit() {
    this.getAllTags();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllTags() {
    this.ngxSpinner.show();
    let getAllTagsURL = `${urls.GET_ALL_TAGS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(getAllTagsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.tagsList = response.data as tag[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };

  pageChange(pageNumber){

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/tags-action/update`]);
    let targetTheme = this.tagsList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#tagOnEdit" , targetTheme);
  };

  navigateToCreateNewTag(){
    this.router.navigate(['profile/en/admin/tags-action/new']);
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts(){
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

}
