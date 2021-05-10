import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, dress, httpService, localStorageService, resources, responseModel, urls, vendorService } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dresses',
  templateUrl: './dresses.component.html',
  styleUrls: ['./dresses.component.scss']
})
export class DressesComponent implements OnInit {
  //labels
  labels: any = {};
  lang: string = "en";
  allCategories = [];
  allAreas = [];
  currentUserEmail: string;
  dressess: vendorService[];

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 12;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  constructor(private localStorage: localStorageService , private http: httpService , private resources: resources,
    private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.loadResources()
    }

  ngOnInit() {
    this.getAllCategories();
    this.getAllAreas();
    this.getAllDresses();
  }

  getAllDresses(){
    let servicesURL = `${urls.GET_SERVICES_BY_TYPE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`
    this.http.Get(servicesURL , {"type": "DRESS"}).subscribe((response: responseModel) =>{
      if(!response.error){
        this.spinner.hide();
        this.dressess = response.data as vendorService[];
        this.collectionSize = this.dressess.length;
        this.pageChange(1);
        // this.marking();
      }
    })
  };

  navigateToDress(dressId){
    let dress = this.dressess.find(x => x._id == dressId);
    this.router.navigate([`segment/${this.lang}/dress/${dressId}`]);
    this.localStorage.setLocalStorage("weds360#dress" , dress);
  };

  getAllAreas() {
    let allAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allAreasURL, {}).subscribe((response: responseModel) => {

      if (!response.error) {
        this.allAreas = response.data;

      } else {
        console.log(response.error);
      }
    });
  };

  getAllCategories() {
    let allCatesURL = `${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}`;
    this.http.Get(allCatesURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.allCategories = response.data;
      } else {
        console.log(response.error);
      }
    });
  };

  async loadResources() {
    let lang = window.location.href.toLowerCase().indexOf(`/ar/`) > -1 ? "ar" : "en";
    let resourceLang = lang == null || lang == undefined ? environment.defaultLang : lang;

    this.lang = ((resourceLang == null) || (resourceLang == undefined)) ? environment.defaultLang : resourceLang;
    let resData = await this.resources.load(this.lang, constants.VIEWS["SEGMENTS_SERVICE"]) as any;;
    this.labels = resData.res;
  };

  pageChange(pageNumber) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      window.scroll(0,0);
      this.limit = this.pageSize * pageNumber;
      this.skip = Math.abs(this.pageSize - this.limit);
    }, 300);
    this.marking();
  };

  marking(){
    // setTimeout(() => {
    //   this.dressess.forEach((photo) => {
    //     let isPhotoLiked = this.bookmarkedPhotosList.find(x => x.id == photo._id);
    //     if(isPhotoLiked != undefined){
    //       let like = document.getElementById(photo._id);
    //       if(like != null){
    //         like.classList.add("liked");
    //       }
    //     }
    //   })
    // }, 350);
  };
}
