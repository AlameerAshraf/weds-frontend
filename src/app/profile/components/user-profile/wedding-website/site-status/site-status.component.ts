import { Router } from '@angular/router';
import { localStorageService, weddingWebsite } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.scss']
})
export class SiteStatusComponent implements OnInit {
  weddingWebsite: weddingWebsite = {
    coverImage : "assets/images/defaults/wedding/cover-photo.png",
    location: {
      venue: "",
      address: "",
      latitude: 0,
      longtitude: 0,
    }
  }

  constructor(private localStorageService: localStorageService , private router: Router) { }

  ngOnInit() {
    this.getWebSiteStaus();
  }

  getWebSiteStaus(){;
    this.weddingWebsite = this.localStorageService.getLocalStorage("weds360#mysite");
  };

  previewSite(){
    this.router.navigateByUrl("/sites/en/save-the-day");
  };
}
