import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admin-view',
  templateUrl: './user-admin-view.component.html',
  styleUrls: ['./user-admin-view.component.scss']
})
export class UserAdminViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(url){
    this.router.navigateByUrl(`/profile/en/admin/${url}`)
  };
}
