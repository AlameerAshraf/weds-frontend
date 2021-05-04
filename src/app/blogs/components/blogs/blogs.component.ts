import { constants, localStorageService, urls, httpService, responseModel, post } from 'src/app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  categoryId;
  isAuthed: boolean;
  currentUserEmail: string;

  blogs: post[] = [];
  featuredPost = new post();

  constructor(private Router: Router, private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private localStorage: localStorageService,
    private http: httpService, private toastr: ToastrService ) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params["categoryId"];
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.getBlogsPercategory();
  }


  getBlogsPercategory(){
    let blogsPerCategoryURL = `${urls.GET_ALL_BLOGS_PER_CATEGORY}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(blogsPerCategoryURL , { "category": this.categoryId }).subscribe((response: responseModel) =>{
      if(!response.error){
        this.spinner.hide();
        this.blogs = response.data as post[];
        console.log(this.blogs)
        this.featuredPost = this.getRandomPost(this.blogs);
        // this.featuredPost.publishedDate = this.featuredPost.publishedAt.toLocaleDateString();
      }else{
        this.spinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load any bost.");
      }
    })
  };

  navigateToBlogPost(blogId){

  };

  getRandomPost(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  checkLoginStatus(){
    let isLogined = this.localStorage.getLocalStorage("weds360#data");
    if(isLogined != undefined || isLogined != ''){
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  };
}
