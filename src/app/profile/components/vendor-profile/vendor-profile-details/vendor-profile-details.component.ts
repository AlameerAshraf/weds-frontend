import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-profile-details',
  templateUrl: './vendor-profile-details.component.html',
  styleUrls: ['./vendor-profile-details.component.scss']
})
export class VendorProfileDetailsComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  createNewCheckList(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/vendor/checklist-defaults');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/vendor/overview');
  };

}
