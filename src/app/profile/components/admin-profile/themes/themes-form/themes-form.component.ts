import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-themes-form',
  templateUrl: './themes-form.component.html',
  styleUrls: ['./themes-form.component.scss']
})



export class ThemesFormComponent implements OnInit, AfterViewInit {
  coverPhotoSource = "";
  constructor(private spinner: NgxSpinnerService, private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadScripts();
  }

  navigateToThemesDefaults() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/themes-defaults');
    }, 3000);
  };

  backToRoute() {
    this.router.navigateByUrl('/profile/en/admin/themes-defaults');
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
