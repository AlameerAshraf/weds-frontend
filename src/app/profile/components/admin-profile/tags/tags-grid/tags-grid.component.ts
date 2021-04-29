import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, resources, tag, localStorageService, responseModel, urls, httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tags-grid',
  templateUrl: './tags-grid.component.html',
  styleUrls: ['./tags-grid.component.scss']
})
export class TagsGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  tagsList: tag[] = [];
  lang: string;
  labels: any = {};

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  // Search vars!
  searchableList: tag[] = [];
  that: any = this;
  searchKey = undefined;
  // End search vars!


  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService, private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#tagOnEdit");
  }

  ngOnInit() {
    this.getAllTags();
  }


  getAllTags() {
    this.ngxSpinner.show();
    let getAllTagsURL = `${urls.GET_ALL_TAGS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(getAllTagsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.tagsList = response.data as tag[];
        this.tagsList = this.searchableList = this.tagsList.filter(x => x.isRemoved == false) as tag[];
        this.collectionSize = this.tagsList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });

  };


  editEntity(id: any) {
    this.router.navigate([`profile/${this.lang}/admin/tags-action/update`]);
    let targetTheme = this.tagsList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#tagOnEdit", targetTheme);
  };

  deleteEntity(id: any) {
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_TAG}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL, {}, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Tag has been deleted succesfully", "An tag has been deleted and wedding website will be impacted.");
        this.getAllTags();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your tag couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewTag() {
    this.router.navigate([`profile/${this.lang}/admin/tags-action/new`]);
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
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["TAGS"]
    )) as any;
    this.labels = resData.res;
  }

  //#search region functions
  search() {
    this.showPaging = false;
    this.ngxSpinner.show();

    this.searchableList = this.tagsList.filter((aTag) => {
      return (aTag.description.includes(this.searchKey))
        || (aTag.name.includes(this.searchKey));
    });
    window.scroll(0, 0);

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.searchableList.length;
    }, 0);
  };

  clearSearch() {
    this.showPaging = false;
    this.ngxSpinner.show();
    window.scroll(0, 0);
    this.searchableList = this.tagsList;

    setTimeout(() => {
      this.ngxSpinner.hide();
      this.showPaging = true;
      this.collectionSize = this.tagsList.length;
      this.searchKey = undefined;
    }, 0);

  };
  //#endregion

  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0, 0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion


}
