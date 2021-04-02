import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef } from '@angular/core';

@Component({
  selector: 'app-wedding-website',
  templateUrl: './wedding-website.component.html',
  styleUrls: ['./wedding-website.component.scss'],
})
export class WeddingWebsiteComponent implements OnInit, AfterViewInit {
  is = false;
  coverPhotoSource: any = '';
  constructor(@Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef) { }

  ngOnInit() {
  }

  selectTemplate(e) {
    e.preventDefault();
    this.is = !this.is;
    let like = document.getElementById('template1');
    if (!this.is) {
      like.classList.add("liked");
    } else {
      like.classList.remove("liked");
    }
  };

  onFileSelected(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return this.coverPhotoSource = fileReader.result;
      };
      fileReader.readAsDataURL(imageFile);
    }
  };

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js', 'assets/scripts/dropzone.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
