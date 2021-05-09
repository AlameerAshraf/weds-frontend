import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, httpService, localStorageService, urls, responseModel, photo } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {
  isAuthed: boolean = false;
  photos: photo[] = [];
  currentUserEmail: string;
  lang = "en";

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 12;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  constructor(private localStorage: localStorageService , private http: httpService ,
    private spinner: NgxSpinnerService, private toaster: ToastrService) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }

  ngOnInit() {
    this.checkLoginStatus();
    this.getAllPhotos();
  }

  getAllPhotos(){
    this.spinner.show();
    let allPhotosURL = `${urls.GET_ALL_PHOTOS}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(allPhotosURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.spinner.hide();
        this.photos = response.data as photo[];
        this.collectionSize = this.photos.length;
        this.pageChange(1);
      } else {

      }
    });
  };

  navigateToPhoto(photoId){

  };

  selectBookmark(e: any, photoId) {
    e.preventDefault();
    let targetTemplate = this.photos.find(x => x._id == photoId);
    targetTemplate.isLiked = true;

    console.log(targetTemplate)
    // let like = document.getElementById(photoId);

    // if (targetTemplate.isLiked) {
    //   like.classList.remove("liked");
    // } else {
    //   like.classList.add("liked");
    // }
  };


  bookmarkPhoto(e: any, photoId: any) {
    this.selectBookmark(e , photoId);
    return
    this.spinner.show()

    let deleteURL = `${urls.DELETE_USER_BOOKMARKS}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`
    console.log({ deleteURL })
    this.http.Post(deleteURL, { id: photoId, actionType: 'bookmark', entityType: 'PHOTO' }, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide()
        this.toaster.success("bookmark has been deleted successfully", "Photo has been bookmarked successfully ❤");
        // this.getAllBookmarks();
      } else {
        this.spinner.hide()
        this.toaster.error("Our bad sorry!", "Ooh Sorry, your bookmark couldn't be created on the server!")
      }
    })
  };


  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };

  pageChange(pageNumber) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      window.scroll(0,0);
      this.limit = this.pageSize * pageNumber;
      this.skip = Math.abs(this.pageSize - this.limit);
    }, 1000);
  };
}
