import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, photo,LookupsService, localStorageService, responseModel, urls, httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html',
  styleUrls: ['./photos-grid.component.scss']
})
export class PhotosGridComponent implements OnInit {

  startTypingAnimation: boolean = true;

  photosList: photo[] = [];

  lang: string;
  labels: any = {};

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 5;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!
  
  categories: any;
  tagsAr: any;
  tagsEn: any;
  vendors: any;

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService, private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute,
    private lookupsService: LookupsService) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#themeOnEdit");
  }

  async ngOnInit() {
    let tempLookup = await this.getLookups();
    this.getAllPhotos();
  }

  getAllPhotos() {
    this.ngxSpinner.show();
    let getAllThemesURL = `${urls.GET_ALL_PHOTOS}/${constants.APP_IDENTITY_FOR_ADMINS}`;

    this.http.Get(getAllThemesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.photosList = response.data as photo[];
        this.collectionSize = this.photosList.length;
        this.pageChange(1);
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  async getLookups() {
    this.categories = ((await this.lookupsService.getCategories()) as responseModel).data;
    this.storage.setLocalStorage("weds360#categories", this.categories);

    let allTags = (await this.lookupsService.getTags()) as responseModel;
    this.tagsAr = allTags.data.filter((tag: any) => {
      return tag.langauge == "Ar";
    });
    this.storage.setLocalStorage("weds360#tagsAr", this.tagsAr);

    this.tagsEn = allTags.data.filter((tag: any) => {
      return tag.langauge == "En";
    });
    this.storage.setLocalStorage("weds360#tagsEn", this.tagsEn);

    this.vendors = ((await this.lookupsService.getVendorsAsLookups()) as responseModel).data;
    this.storage.setLocalStorage("weds360#vendors", this.vendors);
  };


  editEntity(id: any) {
    let targetTheme = this.photosList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#photoOnEdit", targetTheme);
    this.router.navigate([`profile/${this.lang}/admin/photos-action/update`]);
  };

  deleteEntity(id: any) {
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_PHOTO}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL, {}, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide();
        this.toastr.success("Theme has been deleted succesfully", "An theme has been deleted and wedding website will be impacted.");
        this.getAllPhotos();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your theme couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewPhoto() {
    this.router.navigate([`profile/${this.lang}/admin/photos-action/new`]);
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
      constants.VIEWS["PHOTOS"]
    )) as any;
    this.labels = resData.res;
  }


  //#region Paging Helpers ..
  pageChange(pageNumber) {
    window.scroll(0,0);
    this.limit = this.pageSize * pageNumber;
    this.skip = Math.abs(this.pageSize - this.limit);
  };
  //#endregion

}
