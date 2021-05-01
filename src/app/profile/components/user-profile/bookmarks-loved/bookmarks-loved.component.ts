import { Component, ElementRef, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { constants, httpService, localStorageService, resources, responseModel, urls, weddingWebsite } from "src/app/core"
import { environment } from "src/environments/environment"
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-bookmarks-loved',
  templateUrl: './bookmarks-loved.component.html',
  styleUrls: ['./bookmarks-loved.component.scss']
})
export class BookmarksLovedComponent implements OnInit {

  lang: string
  labels: any = {}
  currentUserEmail: string
  bookmarks: [] = []
  constructor(private resources: resources, private storage: localStorageService, private toastr: ToastrService,
    private elementRef: ElementRef, private http: httpService, private ngxSpinner: NgxSpinnerService) {
    this.loadResources()
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"))

  }

  ngOnInit() { this.getAllBookmarks() }

  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en"

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang
    this.lang = resourceLang

    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["BOOKMARKS"]
    )) as any
    this.labels = resData.res
  }
  getAllBookmarks() {
    this.ngxSpinner.show()
    let getUserBookmarks = `${urls.GET_USER_BOOKMARKS}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`

    this.http.Get(getUserBookmarks, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.bookmarks = response.data
        console.log(this.bookmarks)

        this.ngxSpinner.hide()
      } else {
        this.ngxSpinner.hide()
      }
    })
  };

  deleteEntity(id: any) {
    this.ngxSpinner.show()

    let deleteURL = `${urls.DELETE_USER_BOOKMARKS}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`
    console.log({ deleteURL })
    this.http.Post(deleteURL, { id: id, actionType: 'delete', entityType: 'vendor' }, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.ngxSpinner.hide()
        this.toastr.success("bookmark has been deleted successfully", "An area has been deleted and wedding website will be impacted.")
        this.getAllBookmarks()
      } else {
        this.ngxSpinner.hide()
        this.toastr.error("Our bad sorry!", "Ooh Sorry, your bookmark couldn't deleted on the server!")
      }
    })
  };

}
