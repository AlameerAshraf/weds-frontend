import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { constants, resources, weddingDetials } from 'src/app/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-wedding-details',
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {
  lang: string;
  labels: any = {};
  weddingDetails: weddingDetials = new weddingDetials();
  constructor(@Inject(DOCUMENT) private document: any, private resources: resources,
    private elementRef: ElementRef,) { }

  ngOnInit() {
    this.loadResources();
  }

  saveWeddingAndPartenerDetails(){
    let dateValue: any = document.getElementById("date-picker");
    this.weddingDetails.weddingDate = new Date(dateValue.value);

    console.log(this.weddingDetails);
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;

    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["WEDDING_DETAILS"]
    )) as any;
    this.labels = resData.res;

  };
}
