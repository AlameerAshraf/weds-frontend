import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, localStorageService, resources, responseModel, urls, vendorService } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rings',
  templateUrl: './rings.component.html',
  styleUrls: ['./rings.component.scss']
})
export class RingsComponent implements OnInit {

  //labels
  labels: any = {};
  lang: string;
  allCategories = [];
  allAreas = [];
  currentUserEmail: string;

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 12;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!
  rings: vendorService[] = [];


  constructor(private localStorage: localStorageService , private http: httpService , private resources: resources,
    private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
      this.loadResources()
    }

  ngOnInit() {
    this.getAllAreas();
    this.getAllRings();
  }

  getAllRings(){
    let servicesURL = `${urls.GET_SERVICES_BY_TYPE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`
    this.http.Get(servicesURL , {"type": "RING"}).subscribe((response: responseModel) =>{
      if(!response.error){
        this.spinner.hide();
        this.rings = response.data as vendorService[];
        this.collectionSize = this.rings.length;
        this.pageChange(1);
        // this.marking();
      }
    })
  };

  navigateToRing(ringId){
    let ring = this.rings.find(x => x._id == ringId);
    this.router.navigate([`segment/${this.lang}/ring/${ringId}`]);
    this.localStorage.setLocalStorage("weds360#ring" , ring);
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
  };
}
