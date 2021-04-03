import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
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

}
