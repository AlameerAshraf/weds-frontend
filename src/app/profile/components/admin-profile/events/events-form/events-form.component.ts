import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  navigateToEventsDefaults() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/events-defaults');
    }, 3000);
  };

  backToRoute() {
    this.router.navigateByUrl('/profile/en/admin/events-defaults');
  };

}
