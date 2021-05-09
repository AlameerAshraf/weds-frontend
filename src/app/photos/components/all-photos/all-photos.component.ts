import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { constants, httpService, localStorageService, urls, responseModel, photo } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  bookmarkedPhotosList: any[] = [];

  // Paging vars!
  collectionSize: number = 0;
  pageSize: any = 12;
  limit: number;
  skip: number;
  showPaging = true;
  // End paging vars!

  constructor(private localStorage: localStorageService , private http: httpService ,
    private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) {
      this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    }

  async ngOnInit() {
    let loaded = await this.getBookmarkedPhotos();
    this.checkLoginStatus();
    this.getAllPhotos();
  }

  getBookmarkedPhotos(){
    return new Promise((resolve , reject) => {
      this.spinner.show()

      let bookmarkesURL = `${urls.GET_USER_BOOKMARKS_PER_TYPE}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`
      this.http.Get(bookmarkesURL, { type: 'PHOTO' }).subscribe((response: responseModel) => {
        if (!response.error) {
          this.bookmarkedPhotosList = response.data;
          resolve({ bookmarksLoaded: true })
        }
      })
    })
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
        this.marking();
      }
    });
  };

  navigateToPhoto(photoId){
    this.router.navigate([`photos/${this.lang}/photo/${photoId}`]);
  };

  selectBookmark(e: any, photoId) {
    e.stopPropagation();
    let targetTemplate = this.photos.find(x => x._id == photoId);
    targetTemplate.isLiked = !targetTemplate.isLiked;

    if (targetTemplate.isLiked) {
      let like = document.getElementById(photoId);
      like.classList.add("liked");
      this.bookmarkPhoto(photoId);
    } else {
      let like = document.getElementById(photoId);
      like.classList.remove("liked");
    }
  };


  bookmarkPhoto(photoId: any) {
    this.spinner.show()

    let bookmarkPhotoURL = `${urls.DELETE_USER_BOOKMARKS}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`
    this.http.Post(bookmarkPhotoURL, { id: photoId, actionType: 'bookmark', entityType: 'PHOTO' }, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide()
        this.toaster.success("bookmark has been updated successfully", "Photo has been bookmarked successfully ❤");
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
    }, 300);
    this.marking();
  };

  marking(){
    setTimeout(() => {
      this.photos.forEach((photo) => {
        let isPhotoLiked = this.bookmarkedPhotosList.find(x => x.id == photo._id);
        if(isPhotoLiked != undefined){
          let like = document.getElementById(photo._id);
          if(like != null){
            like.classList.add("liked");
          }
        }
      })
    }, 350);
  };
}
