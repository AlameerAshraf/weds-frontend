import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { post, LookupsService, responseModel, urls, constants, httpService, category, localStorageService, resources } from 'src/app/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $;

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss']
})
export class PostsFormComponent implements OnInit, AfterViewInit {
  that = this;
  htmlEnglishContent: any = "";
  htmlArabicContent: any = "";

  post: post = new post();

  tinymceInit = {
    height: "400",
    plugins: [
      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
      "searchreplace visualblocks visualchars code fullscreen",
      "insertdatetime media nonbreaking save table directionality",
      "emoticons template paste textpattern"
    ],
    toolbar: 'formatselect | bold italic forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | image emoticons',
    image_advtab: false,
    images_upload_handler: this.tiny_image_upload_handler.bind(this),
  };

  tagsEnglish: any;
  tagsArabic: any;
  posts: any;
  categories: category[] = [];
  currentUserEmail: string;
  editingMode: any;
  labels: any = {};
  lang: string;

  constructor(private spinner: NgxSpinnerService, private router: Router,
    private activatedRoute: ActivatedRoute, private storage: localStorageService,
    private toastr: ToastrService, @Inject(DOCUMENT) private document: any, private resources: resources,
    private elementRef: ElementRef, private lookupsService: LookupsService,
    private http: httpService) {
    window.scrollTo(0, 0);
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));

    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
    });
  }


  async ngOnInit() {
    this.spinner.show();
    let tempVar = await this.getLookups(); // this var is doing nothing just for waiting the results!
    this.spinner.hide();
    this.loadPost();
    this.loadResources();
    this.loadScripts();
    this.documentSelectors();
  }

  createPost() {
    this.spinner.show();

    // Set user email as author!
    this.post.author = this.currentUserEmail;
    this.post.isPublished = this.post.scheduledAt == undefined ? true : false;
    this.post.isScheduledPost = this.post.scheduledAt == undefined ? false : true;

    let createNewPostURL = `${urls.CREATE_POST}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Post(createNewPostURL, {}, { "post": this.post }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide();
        this.toastr.success("Gooood!", "Amazing words catch hearts before eyes, post has been added successfully 💕");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/posts`);
      } else {
        this.spinner.hide();
        this.toastr.error("Our bad sorry!", "My bad, server couldn't create your post.");
      }
    });
  };

  updatePost() {
    this.spinner.show();

    // Set user email as author!
    this.post.author = this.currentUserEmail;
    this.post.isPublished = this.post.scheduledAt == undefined ? true : false;
    console.log(this.post.scheduledAt)
    this.post.isScheduledPost = (this.post.scheduledAt == undefined || this.post.scheduledAt == "") ? false : true;

    let updatePostURL = `${urls.UPDATE_POST}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.post._id}`;
    this.http.Post(updatePostURL, {}, { "post": this.post }).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide();
        this.toastr.success("Gooood!", "Amazing Post has been updated successfully 💕");
        this.router.navigateByUrl(`/profile/${this.lang}/admin/posts`);
      } else {
        this.spinner.hide();
        this.toastr.error("Our bad sorry!", "My bad, server couldn't create your post.");
      }
    });
  };

  async loadPost() {
    if (this.editingMode == "update") {
      this.post = this.storage.getLocalStorage("weds360#postOnEdit");
      this.spinner.show();
      this.fetchEdiedPosts(this.post.bodyEnURL, "en");
      this.fetchEdiedPosts(this.post.bodyArURL, "ar");
      // this.post.scheduledAt = this.post.scheduledAt.toString().split('T')[0];
      this.spinner.hide();
    }
  };


  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/admin/posts`);
  };


  async getLookups() {
    let allTags = (await this.lookupsService.getTags()) as responseModel;
    let allCats = (await this.lookupsService.getCategories()) as responseModel;
    let allPosts = (await this.lookupsService.getPostsAsLookups()) as responseModel;
    this.posts = allPosts.data;
    this.categories = allCats.data;

    this.tagsArabic = allTags.data.filter((tag: any) => {
      return tag.langauge == "Ar";
    });

    this.tagsEnglish = allTags.data.filter((tag: any) => {
      return tag.langauge == "En";
    });
  };


  tiny_image_upload_handler(blobInfo, success, failure, progress) {
    const imageFile = blobInfo.blob();
    this.uploadPhoto(imageFile, success, failure);
  };

  uploadPhoto(file, success, failuer) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("targetEntity", "POSTS");
    formData.append("isSlefAssigned", "false");
    formData.append("targetUserEmail", this.currentUserEmail);

    let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_ADMINS}`;
    this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
      if (!response.error) {
        this.spinner.hide();
        success(response.data)
      } else {
        this.spinner.hide();
        failuer(response.error);
      }
    });
  };

  fetchEdiedPosts(postFileUrl: any, lang) {
    return this.http.Fetch(postFileUrl).subscribe((response) => {
      console.log(response)
      if (lang == "ar")
        this.post.bodyContentAr = response;
      else if (lang == "en")
        this.post.bodyContentEn = response;
    })
  };


  //#region Helper Methods ..
  tagsBinder(tagId, lang) {
    if (lang == "ar")
      return this.post.tagsAr.some(entry => entry === tagId);
    else if (lang == "en")
      return this.post.tagsEn.some(entry => entry === tagId);
  };

  relatedPostsBinder(postId) {
    return this.post.relatedPosts.some(entry => entry === postId);
  };

  documentSelectors() {
    $("#tagsAr").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.post.tagsAr = $("#tagsAr").chosen().val();
    });

    $("#tagsEn").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.post.tagsEn = $("#tagsEn").chosen().val();
    });

    $("#relatedPosts").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.post.relatedPosts = $("#relatedPosts").chosen().val();
    });

    $("#cats").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.post.category = $("#cats").chosen().val();
    });
  };

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  getImage() {
    document.getElementById("upImage").click();
  };

  getVideo() {
    document.getElementById("upVideo").click();
  };

  uploadCoverPhoto(e: any) {
    this.spinner.show();
    const imageFile = e.target.files[0]
    this.uploadPhoto(imageFile, (url: any) => {
      this.spinner.hide();
      this.post.featuredImage = url;
    }, (err) => {
      this.spinner.hide();
      this.post.featuredImage = "";
    })
  };

  uploadVideo(e: any) {
    this.spinner.show();
    const imageFile = e.target.files[0];
    this.uploadPhoto(imageFile, (url: any) => {
      this.spinner.hide();
      this.post.featuredVideo = url;
    }, (err) => {
      this.spinner.hide();
      this.post.featuredVideo = "";
    })
  };
  //#endregion

  //#region Blogs Gallery
  uploadImagePhoto(e: any, imageId: any) {
    this.spinner.show();
    const imageFile = e.target.files[0];
    let slectedImage = this.post.images.find(x => x.id == imageId);
    this.uploadPhoto(imageFile, (url: any) => {
      this.spinner.hide();
      slectedImage.url = url;
    }, (err: any) => {
      this.spinner.hide();
      console.log(err);
      slectedImage.url = "";
    })
  };

  makeid(length: any) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  };

  addImage() {
    this.post.images.push({
      id: this.makeid(10),
      url: "assets/images/defaults/wedding/cover-photo.png",
      arabicDesc: "Arabic Desc.",
      englishDesc: "English Desc."
    })
  };

  removeImage(id: any) {
    let targetImageIndex = this.post.images.indexOf(this.post.images.find(x => x.id == id));
    this.post.images.splice(targetImageIndex, 1);
  };
  //#endregion

  //#region Scripts Helpers
  async ngAfterViewInit() {
    this.spinner.show();
    let tempVar = await this.getLookups(); // this var is doing nothing just for waiting the results!
    this.spinner.hide();
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/datePickerInitakizer.js', 'assets/scripts/custom.js', 'assets/scripts/dropzone.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  }
  //#endregion
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
      constants.VIEWS["POSTS"]
    )) as any;
    this.labels = resData.res;
  }
}
