import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';


@Component({
  selector: 'app-services-ring-form',
  templateUrl: './services-ring-form.component.html',
  styleUrls: ['./services-ring-form.component.scss']
})
export class ServicesRingFormComponent implements OnInit {

  coverPhotoSource="";
  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService,@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef) { }

  ngOnInit() {
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

}
