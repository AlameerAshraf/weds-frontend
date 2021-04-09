import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { constants, httpService, registery, urls , responseModel } from 'src/app/core';

@Component({
  selector: 'app-registrylist',
  templateUrl: './registrylist.component.html',
  styleUrls: ['./registrylist.component.scss']
})
export class RegistrylistComponent implements OnInit {
  registeryList: registery[] = [];
  newlyAddedRegistery: registery = {
    address: "",
    image: "assets/images/defaults/wedding/cover-photo.png",
    isNew: true,
    note: "",
    price: "",
    title: ""
  };
  currentUserEmail: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute , private http: httpService,
    private ngxSpinner: NgxSpinnerService , private toastr: ToastrService){
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  }

  ngOnInit() {
  }


  addNewWish(){
    this.registeryList.push(this.newlyAddedRegistery);
  };

  saveRegistryList(){
    let createRegistryList = `${urls.CREATE_REGISTRY_LIST_ITEM}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(createRegistryList , {} , { "registery" : this.newlyAddedRegistery }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new checklist item created" , "Wow, Your checklist just created! start the planning! 🎉");
        // this.getChecklistsPerUser();
        // this.newlyCreatedCheckList = {
        //   isChecked: false,
        //   note: "",
        //   title: "",
        //   isNew: true,
        //   _id: "sd"
        // }
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your checklist couldn't created on the server!");
      }
    });
  };


  uploadImage(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity" , "REGISTRY");
      formData.append("isSlefAssigned" , "true");
      formData.append("targetUserEmail" , this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL , {} , formData).subscribe((response: responseModel) => {
        if(!response.error){
          this.ngxSpinner.hide();
          this.newlyAddedRegistery.image = response.data;
        } else {
          this.ngxSpinner.hide();
        }
      });
    }
  };
}
