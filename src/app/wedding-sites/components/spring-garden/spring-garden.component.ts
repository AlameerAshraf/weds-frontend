import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { constants, httpService, registery, responseModel, urls, weddingWebsite } from 'src/app/core';
import { weddingTemplatesHelper } from '../../helpers';

@Component({
  selector: 'app-spring-garden',
  templateUrl: './spring-garden.component.html',
  styleUrls: ['./spring-garden.component.scss']
})
export class SpringGardenComponent implements OnInit {
  helper: weddingTemplatesHelper;
  routingURL: any;
  weddingData: any;
  ownerData: any;
  userInfo: any;
  websiteData: weddingWebsite = new weddingWebsite();
  weddingTime: string;
  preMartialWeddingTime: string;
  registryList: registery[] = [];


  tempAlbumFiles: any[] = [];
  files: File[] = [];
  currentUserEmail: string;


  constructor(private httpService: httpService , private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private titleService: Title) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.routingURL = params["me"];
    });


    this.helper = new weddingTemplatesHelper(this.httpService , this.router);
    this.weddingData = await this.helper.getWeddingWebisteData(this.routingURL) as any;

    this.websiteData = this.weddingData["wedding"].website as weddingWebsite;
    this.userInfo = this.weddingData["user"];
    this.helper.getWeddingWebsiteOwner(this.routingURL);

    this.weddingTime = new Date(this.websiteData.weddingTime).toDateString();
    this.preMartialWeddingTime = new Date(this.websiteData.preWeddingMaritalCeremony).toDateString();
    this.registryList = this.weddingData["wedding"].registery as registery[];

    this.titleService.setTitle(`${this.userInfo.name} & ${this.userInfo.partener.name} ❤ are getting married!`);

    console.log(this.weddingData["wedding"] , this.websiteData)
  }

  //#region Helpers
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  };
  //#endregion

  //#region  DropZone Engine Helper Function..
  onSelect(event: any) {
    this.spinner.show();
    for (const key in event.addedFiles) {
      const formData = new FormData();
      const imageFile = event.addedFiles[key];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["VISITORS_WEDDING_SITE"]);
      formData.append("isSlefAssigned", "true");
      formData.append("targetUserEmail", this.websiteData._id);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.httpService.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.spinner.hide();
          this.tempAlbumFiles.push({ name: event.addedFiles[key].name, url: response.data });
          this.files.push(event.addedFiles[key]);

          this.bindTempFilesToWeddingObject();
          // this.weddingWebsite.album.push(response.data);
        } else {
          this.spinner.hide();
        }
      });
    }
  };

  onRemove(event: any) {
    console.log(event.name)
    let targetFileInTemp = this.tempAlbumFiles.findIndex(x => x.name == event.name);

    this.files.splice(this.files.indexOf(event), 1);
    this.tempAlbumFiles.splice(targetFileInTemp, 1);

    this.bindTempFilesToWeddingObject();
  };

  bindTempFilesToWeddingObject() {
    this.websiteData.album = [];
    this.tempAlbumFiles.forEach((imge) => {
      this.websiteData.album.push(imge.url);
    });
  };

  async convertURLtoFile(image) {
    // image = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    let response = await fetch(image);
    let data = await response.blob();
    let metadata = {
      type: `image/${image.split('.').pop()}`
    };

    return new File([data], image.split('/').pop(), metadata);
  }
  //#endregion
}
