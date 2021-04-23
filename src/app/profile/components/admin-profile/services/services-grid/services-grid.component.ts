import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, vendorService, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.scss']
})
export class ServicesGridComponent implements OnInit {
  servicesList: vendorService[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
  private router: Router,
  private storage: localStorageService,
  private elementRef: ElementRef, private resources: resources,
  private http: httpService,private toastr: ToastrService,
  private ngxSpinner: NgxSpinnerService,
  private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#vendorServiceOnEdit");
}

  ngOnInit() {
    this.getAllVendorServices();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllVendorServices() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_VENDOR_SERVICES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.servicesList = response.data as vendorService[];
        console.log(this.servicesList)
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/services-action/update`]);
    let targetTheme = this.servicesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#vendorServiceOnEdit" , targetTheme);
  };

  pageChange(pageNumber){

  };

  navigateToCreateNewService(){
    this.router.navigate(['profile/en/admin/services-action/new']);
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
