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

  onEditRegistry: registery = {
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
    this.getAllRegistryListPerUser();
  }

  getAllRegistryListPerUser(){
    this.ngxSpinner.show();
    let getRegistryURL = `${urls.GET_REGISTRY_LIST_PER_USER}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;

    this.http.Get(getRegistryURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.registeryList = response.data as registery[];
      }else{
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "My bad, server couldn't load your registries.");
      }
    });
  };


  addNewWish(){
    this.registeryList.push(this.newlyAddedRegistery);
  };

  editWish(id: any){
    let targetRegitry = this.registeryList.find(x => x._id == id) as registery;
    targetRegitry["editable"] = true;
    targetRegitry["isNew"] = true;

    this.onEditRegistry = targetRegitry;
    console.log(this.onEditRegistry)
  };

  saveRegistryListItem(){
    let createRegistryList = `${urls.CREATE_REGISTRY_LIST_ITEM}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(createRegistryList , {} , { "registery" : this.newlyAddedRegistery }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("You have a new registry" , "Wow, Your registry just created! 🎉");
        this.getAllRegistryListPerUser();
        this.newlyAddedRegistery = {
          address: "",
          image: "assets/images/defaults/wedding/cover-photo.png",
          isNew: true,
          note: "",
          price: "",
          title: ""
        }
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your registry couldn't created on the server!");
      }
    });
  };

  updateRegistryListItem(){
    let updateRegistryList = `${urls.UPDATE_REGISTRY_LIST_PER_USER}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(updateRegistryList , {} , { "registery" : this.onEditRegistry }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Registry item updated" , "Wow, Your registry just updated! 🎉");
        this.getAllRegistryListPerUser();
        this.onEditRegistry = {
          address: "",
          image: "assets/images/defaults/wedding/cover-photo.png",
          isNew: true,
          note: "",
          price: "",
          title: ""
        }
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your registry couldn't created on the server!");
      }
    });
  };

  confirmDeletRegistryItem(id: any){
    var confirmed = confirm("Are you sure you want to cut this part from your budget.");
    if(confirmed){
      this.deleteRegistryList(id);
    } else {
      return;
    };
  }

  deleteRegistryList(id: any){
    let deleteRegistryList = `${urls.DELETE_REGISTRY_LIST}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}`;
    this.http.Post(deleteRegistryList , {} , { "registeryId" : id }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Registry item deleted" , "Okay relax, it's gone!");
        this.getAllRegistryListPerUser();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your registry couldn't deleted on the server!");
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
