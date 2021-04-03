import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-admin-view',
  templateUrl: './vendor-admin-view.component.html',
  styleUrls: ['./vendor-admin-view.component.scss']
})
export class VendorAdminViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(url){
    this.router.navigateByUrl(`/profile/en/admin/${url}`)
  };
}
