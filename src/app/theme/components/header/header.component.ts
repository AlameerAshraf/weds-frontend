import { constants, resources } from 'src/app/core';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'weds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined = false;
  menuItems = [];
  constructor(private actictedRoute: ActivatedRoute, private resources: resources,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef,) { }

  ngOnInit() {
    this.loadResources();
  }

  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HEADER"]) as any;
    this.menuItems = this.menuItems.concat(resData.res);
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/typedwords.js', 'assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
