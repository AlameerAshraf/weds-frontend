import { localStorageService, registery } from 'src/app/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-registry-list',
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.scss']
})
export class RegistryListComponent implements OnInit {

  @ViewChild('screen' , { static: false }) screen: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;

  myList: registery[] = [];

  constructor(private storage: localStorageService) {
    this.myList = this.storage.getLocalStorage("tempWishesList");
    console.log(this.myList)
  }

  ngOnInit() {
  }

  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
      location.reload();
    });
  }

}
