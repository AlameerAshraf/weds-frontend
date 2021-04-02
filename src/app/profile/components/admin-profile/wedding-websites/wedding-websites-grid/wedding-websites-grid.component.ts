import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wedding-websites-grid',
  templateUrl: './wedding-websites-grid.component.html',
  styleUrls: ['./wedding-websites-grid.component.scss']
})
export class WeddingWebsitesGridComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
  }


}
