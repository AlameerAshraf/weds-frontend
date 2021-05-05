import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-wedding-website',
  templateUrl: './wedding-website.component.html',
  styleUrls: ['./wedding-website.component.scss']
})
export class WeddingWebsiteComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

  ngOnInit() {
    this.loadScripts();
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  loadScripts(){
    let scripts = [
      'assets/scripts/themepunch.revolution.min.js',
      'assets/scripts/themepunch.tools.min.js',
      'assets/scripts/slider-app.js',
      'assets/scripts/extensions/revolution.extension.kenburn.min.js',
      'assets/scripts/extensions/revolution.extension.layeranimation.min.js',
      'assets/scripts/extensions/revolution.extension.navigation.min.js',
      'assets/scripts/extensions/revolution.extension.slideanims.min.js',
      'assets/scripts/extensions/revolution.extension.parallax.min.js',
    ];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };


}
