import { httpService, responseModel } from 'src/app/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleBlogComponent implements OnInit {
  yourHTML= "https://weds360-production.s3.eu-west-1.amazonaws.com/new-weds360-preprod/POSTS_BODY/607f72d3bb1d9b27f0d80030/607f72d3bb1d9b27f0d80030-ar.html";
  html: SafeHtml = "";

  constructor(private httpService: httpService , private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getFile();
  }

  getFile(){
    this.httpService.Fetch(this.yourHTML, {}).subscribe((response: any) => {
      this.html = this._sanitizer.bypassSecurityTrustHtml(response);;
      console.log(response)
    })
  }

}
