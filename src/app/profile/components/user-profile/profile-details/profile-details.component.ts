import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  coverPhotoSource: string | ArrayBuffer = ''

  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef,) { }

  ngOnInit() {
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

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/datePickerInitakizer.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
