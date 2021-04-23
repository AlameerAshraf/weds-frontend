import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { httpService, localStorageService } from 'src/app/core';
declare var $: any;


@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit, AfterViewInit {
  selectedLayout = "";

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService,
    private elementRef: ElementRef, private http: httpService,private toastr: ToastrService,
    private actictedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.loadScripts();
  }

  selectTemplate(template){
    if(this.selectedLayout == template)
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

  loadScripts(){
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
