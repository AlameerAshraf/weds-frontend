import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-services-dress-form',
  templateUrl: './services-dress-form.component.html',
  styleUrls: ['./services-dress-form.component.scss']
})
export class ServicesDressFormComponent implements OnInit, AfterViewInit {

  coverPhotoSource="";
  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService,@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef ) { }

  ngOnInit() {
    this.loadScripts();
  }

  navigateToServicesForm(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/services-action/new');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/services-action/new');
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
