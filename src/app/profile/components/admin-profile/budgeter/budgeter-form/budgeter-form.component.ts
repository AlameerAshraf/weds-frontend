import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { budgeter, constants, urls, httpService, responseModel, localStorageService ,resources} from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-budgeter-form',
  templateUrl: './budgeter-form.component.html',
  styleUrls: ['./budgeter-form.component.scss']
})
export class BudgeterFormComponent implements OnInit {

  editingMode = "new";
  that = this;
  layoutRouting = "";

  currentUserEmail: string;
  themesLayoutLocations = constants.THEMES;
  budgeter: budgeter = {
    description: "",
    name: "",
    recommendedPercentage: 0,
    amount:0
  };
  labels:any={};
  lang:string;

  constructor( private router: Router, @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef, private http: httpService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService,private resources: resources,
    private ngxSpinner: NgxSpinnerService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
     }

     ngOnInit() {
      this.loadScripts();
      this.initBudgeterView();
      this.loadResources();
    };

    initBudgeterView(){
      if(this.editingMode == "update"){
        this.budgeter = this.storage.getLocalStorage("weds360#budgeterOnEdit");
      }
    };

    createNewEntity(){
      this.ngxSpinner.show();

      let createURL = `${urls.CREATE_BUDGETER_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;
      this.http.Post(createURL , {} , { "budgeter" : this.budgeter }).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.toastr.success("Budgeter has been saved succesfully" , "Budgeter has been updated, Bingo!");
          this.router.navigateByUrl(`/profile/${this.lang}/admin/budgeter-defaults`);
        } else {
          this.ngxSpinner.hide();
          this.toastr.error("Our bad sorry!" , "Ooh Sorry, your budgeter couldn't created on the server!");
        }
      });
    };

    updateExistingEntity(){
      this.ngxSpinner.show();

      let updateURL = `${urls.UPDATE_BUDGETER_ADMIN}/${constants.APP_IDENTITY_FOR_ADMINS}`;
      this.http.Post(updateURL , {} , { "budgeter" : this.budgeter }).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.toastr.success("Budgeter has been saved succesfully" , "A Budgeter has been created and wedding website will be impacted.");
          this.router.navigateByUrl(`/profile/${this.lang}/admin/budgeter-defaults`);
        } else {
          console.log(response)
          this.ngxSpinner.hide();
          this.toastr.error("Our bad sorry!" , "Ooh Sorry, your theme couldn't created on the server!");
        }
      });
    };



  backToRoute(){
    this.router.navigateByUrl(`/profile/${this.lang}/admin/budgeter-defaults`);
  };

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

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
        constants.VIEWS["BUDGETERS"]
      )) as any;
      this.labels = resData.res;
  };
}
