import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {

  coverPhotoSource="";
  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService , @Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

  ngOnInit() {
    this.loadScripts();
  }

  navigateToCategorIesDefaults(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/categories-defaults');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/categories-defaults');
  };

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
  };
}
