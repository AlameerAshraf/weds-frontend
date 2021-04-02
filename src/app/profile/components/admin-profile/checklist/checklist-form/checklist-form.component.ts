import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss']
})
export class ChecklistFormComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService , private router: Router) { }

  ngOnInit() {
  };


  createNewCheckList(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.router.navigateByUrl('/profile/en/admin/checklist-defaults');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/checklist-defaults');
  };
}
