import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { httpService, localStorageService } from 'src/app/core';
declare var $: any;

@Component({
  selector: 'app-vendor-services-form',
  templateUrl: './vendor-services-form.component.html',
  styleUrls: ['./vendor-services-form.component.scss']
})
export class VendorServicesFormComponent implements OnInit {

  selectedLayout = "";
  editingMode = "new";

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router, private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService, private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef, private http: httpService, private toastr: ToastrService,
    private actictedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.loadScripts();
      this.activatedRoute.params.subscribe((params) => {
        this.editingMode = params["actionType"];
        if(this.editingMode == "update"){
          this.selectTemplateToUpdate()
        }
      });
    }

    selectTemplateToUpdate(){
      let service = this.storage.getLocalStorage("weds360#vendorServiceOnEdit");
      this.selectedLayout = service.type.toLowerCase();
      return
    }
  
    selectTemplate(template) {
      if(this.editingMode == "update"){
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
}
