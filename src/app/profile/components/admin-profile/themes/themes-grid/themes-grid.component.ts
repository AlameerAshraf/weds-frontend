import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themes-grid',
  templateUrl: './themes-grid.component.html',
  styleUrls: ['./themes-grid.component.scss']
})
export class ThemesGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewTheme(){
    this.router.navigate(['profile/en/admin/themes-action/new']);
  }
}
