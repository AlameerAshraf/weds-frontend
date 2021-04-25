import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { constants ,resources} from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-profile-details',
  templateUrl: './admin-profile-details.component.html',
  styleUrls: ['./admin-profile-details.component.scss']
})
export class AdminProfileDetailsComponent implements OnInit, AfterViewInit {
  coverPhotoSource: string | ArrayBuffer = ''
  labels:any={}
  lang:string
  constructor(@Inject(DOCUMENT) private document: any, private resources: resources,
    private elementRef: ElementRef,) { }

  ngOnInit() {
    this.loadResources();
  }
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
        constants.VIEWS["PROFILE_LAYOUT"]
      )) as any;
      this.labels = resData.res;
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js' , 'assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
