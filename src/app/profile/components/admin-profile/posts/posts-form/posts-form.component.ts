import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss']
})
export class PostsFormComponent implements OnInit {
  images: any[] = []


  htmlEnglishContent: any = "";
  htmlArabicContent: any = "";

  coverPhotoSource= "";
  constructor(private spinner: NgxSpinnerService , private router: Router ,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  view(){
    console.log(this.htmlEnglishContent)
  }

  navigateToPosts(){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigateByUrl('/profile/en/admin/posts');
    }, 3000);
  };

  backToRoute(){
    this.router.navigateByUrl('/profile/en/admin/posts');
  };

  tinymceInit = {
    height : "300",
    plugins : [
      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
      "searchreplace visualblocks visualchars code fullscreen",
      "insertdatetime media nonbreaking save table contextmenu directionality",
      "emoticons template paste textcolor colorpicker textpattern"
    ],
    toolbar : 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent ',
    image_advtab : false,
    images_upload_handler: this.example_image_upload_handler,
  }

  example_image_upload_handler(blobInfo, success, failure, progress){
    console.log('file', blobInfo.blob(), blobInfo.filename())
  }


  //#region Helper Methods ..
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
    const imageFile = e.target.files[0]
    var fileName = imageFile.name.split("\\");
    document.getElementById("photoCliker").innerHTML = `Cover Photo is: ${fileName[fileName.length - 1]}`;
  };

  uploadVideo(e: any) {
    const imageFile = e.target.files[0]
    var fileName = imageFile.name.split("\\");
    document.getElementById("videoClicker").innerHTML = `Uploaded video is: ${fileName[fileName.length - 1]}`;
  };

  addImage(){
    this.images.push("sd")
  };
  //#endregion
}
