import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-offers-form',
  templateUrl: './offers-form.component.html',
  styleUrls: ['./offers-form.component.scss']
})
export class OffersFormComponent implements OnInit, AfterViewInit {

  coverPhotoSource = "";
  constructor(private spinner: NgxSpinnerService, private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadScripts();
    // $("#selectId").change(function(e, params){
    //   console.log($("#selectId").chosen().val())
    //  });
  }

  navigateToOffersDefaults() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/offers-defaults');
    }, 3000);
  };

  backToRoute() {
    this.router.navigateByUrl('/profile/en/admin/offers-defaults');
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
}
