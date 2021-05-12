import { localStorageService } from './../local-storage/local-storage';
import { responseModel } from './../../models/response';
import { urls } from './../../helpers/urls/urls';
import { httpService } from './../http/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminCanActivateService implements CanActivate {

  constructor(private storage: localStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve , reject) => {
      let userRole = atob(this.storage.getLocalStorage("weds360#role"));
      if(userRole !== "ADMIN"){
        this.router.navigateByUrl("/en/home");
      } else {
        resolve(true);
      }
    })
  }
}
