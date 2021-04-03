import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
  }


  navigateToAreasDefaults(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/areas-defaults');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/areas-defaults');
  };
}
