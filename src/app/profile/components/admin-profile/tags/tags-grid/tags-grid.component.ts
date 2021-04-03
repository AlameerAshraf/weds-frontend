import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-grid',
  templateUrl: './tags-grid.component.html',
  styleUrls: ['./tags-grid.component.scss']
})
export class TagsGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageChange(pageNumber){

  };

  navigateToCreateNewTag(){
    this.router.navigate(['profile/en/admin/tags-action/new']);
  }

}
