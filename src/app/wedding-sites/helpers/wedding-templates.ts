import { Router } from '@angular/router';
import { constants, httpService, responseModel, urls, weddingWebsite } from './../../core';


export class weddingTemplatesHelper {
  weddingWebsite: weddingWebsite = new weddingWebsite();
  currentUserEmail: any;
  userInfo: any;

  constructor(private httpService: httpService, private router: Router){
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  };

  getWeddingWebisteData(routeURL){
    return new Promise((resolve , reject) => {
      let weddingDataURL = `${urls.GET_WEDDING_OWNER_EMAIL}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?routeURL=${routeURL}`;

      this.httpService.Get(weddingDataURL , {}).subscribe((response: responseModel) => {
        if(!response.error){
          let weddingData = response.data["weddingData"];
          let userInfo = response.data["userInfo"];
          this.weddingWebsite = weddingData["website"];
          resolve({ wedding: weddingData , user: userInfo });
        } else {
          resolve({ error: true });
        }
      });
    })
  };

  getWeddingWebsiteOwner(routeURL){
    let ownerURL = `${urls.GET_WEDDING_OWNER_EMAIL}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?routeURL=${routeURL}`;

    this.httpService.Get(ownerURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        let ownerEmail = response.data["email"];
        this.validateAuthorityToViewWeddingWebsite(ownerEmail);
      }
    });
  };

  validateAuthorityToViewWeddingWebsite(ownerEmail){
    if(!this.weddingWebsite.isPublished){
      if(this.currentUserEmail != ownerEmail){
        this.router.navigateByUrl('/'); //TODO: Navigate to the 404!
      }
    }
  };
};
