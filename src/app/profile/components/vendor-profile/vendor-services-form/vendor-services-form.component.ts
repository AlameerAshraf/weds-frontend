import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, localStorageService, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-vendor-services-form',
  templateUrl: './vendor-services-form.component.html',
  styleUrls: ['./vendor-services-form.component.scss']
})
export class VendorServicesFormComponent implements OnInit {

  selectedLayout = "";
  editingMode = "new";
  lang: string;
  labels: any = {};
  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router, private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService, private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef, private http: httpService, private toastr: ToastrService, private resources: resources,
    private actictedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadResources();
    this.loadScripts();
    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
      if (this.editingMode == "update") {
        this.selectTemplateToUpdate()
      }
    });
    this.loadResources();
  }

  selectTemplateToUpdate() {
    let service = this.storage.getLocalStorage("weds360#vendorServiceOnEdit");
    this.selectedLayout = service.type.toLowerCase();
    return
  }

  selectTemplate(template) {
    if (this.editingMode == "update") {
      return false;
    }
    if (this.selectedLayout == template)
      this.selectedLayout = "";
    else
      this.selectedLayout = template;
  };




  addNewServiceTemplate() {
    //TODO: Add new service template!
    alert("this feature not implamented yet")
  };


  //#region Script loaders Helpers..
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
  }
  //#endregion
  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    const resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["SERVICES"]
    )) as any;
    this.labels = resData.res;
  }
}
