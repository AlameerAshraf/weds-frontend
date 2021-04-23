import { NgxSpinnerService } from "ngx-spinner";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import {
  constants,
  resources,
  vendor,
  localStorageService,
  responseModel,
  urls,
  httpService,
} from "src/app/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-vendors-grid",
  templateUrl: "./vendors-grid.component.html",
  styleUrls: ["./vendors-grid.component.scss"],
})
export class VendorsGridComponent implements OnInit {
  startTypingAnimation: boolean = true;

  vendorsList: vendor[] = [];

  labels: any = {};
  lang: string;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef,
    private resources: resources,
    private http: httpService,
    private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute
  ) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#vendorOnEdit");
  }

  ngOnInit() {
    this.getAllVendors();
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
      constants.VIEWS["VENDORS"]
    )) as any;
    this.labels = resData.res;
  }

  getAllVendors() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_VENDORS}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.vendorsList = response.data as vendor[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  }

  editEntity(id: any) {
    this.router.navigate([`profile/en/admin/vendors-action/update`]);
    let targetTheme = this.vendorsList.find((x) => x._id == id);
    this.storage.setLocalStorage("weds360#vendorOnEdit", targetTheme);
  }

  deleteEntity(id: any) {
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_VENDOR}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http
      .Post(deleteURL, {}, { vendorId: id })
      .subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.toastr.success(
            "Vendor has been deleted succesfully",
            "An vendor has been deleted."
          );
          this.getAllVendors();
        } else {
          this.ngxSpinner.hide();
          this.toastr.error(
            "Our bad sorry!",
            "Ooh Sorry, your vendor couldn't deleted on the server!"
          );
        }
      });
  }

  publishVendor(id: any) {}

  pageChange(pageNumber) {}

  navigateToCreateNewVendor() {
    this.router.navigate(["profile/en/admin/vendors-action/new"]);
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  loadScripts() {
    let scripts = ["assets/scripts/custom.js"];

    scripts.forEach((element) => {
      const s = this.document.createElement("script");
      s.type = "text/javascript";
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  }
}
