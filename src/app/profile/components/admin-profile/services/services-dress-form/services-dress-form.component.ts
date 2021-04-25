import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import {
  constants,

  resources,
} from "src/app/core";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-services-dress-form',
  templateUrl: './services-dress-form.component.html',
  styleUrls: ['./services-dress-form.component.scss']
})
export class ServicesDressFormComponent implements OnInit, AfterViewInit {

  coverPhotoSource="";
  lang: string;
  labels: any = {};
  constructor(private spinner: NgxSpinnerService , private router: Router ,    private resources: resources,
    private toastr: ToastrService,@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef ) { }

  ngOnInit() {
    this.loadScripts();
    this.loadResources();
  }

  navigateToServicesForm(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl(`/profile/${this.lang}/admin/services-action/new`);
    }, 3000);
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
      constants.VIEWS["SERVICES"]
    )) as any;
    this.labels = resData.res;
  }
  backToRoute(){
    this.router.navigateByUrl(`/profile/${this.lang}/admin/services-action/new`);
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
