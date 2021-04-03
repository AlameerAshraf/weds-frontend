import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-site-admin-view',
  templateUrl: './web-site-admin-view.component.html',
  styleUrls: ['./web-site-admin-view.component.scss']
})
export class WebSiteAdminViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(url){
    this.router.navigateByUrl(`/profile/en/admin/${url}`)
  };
}
