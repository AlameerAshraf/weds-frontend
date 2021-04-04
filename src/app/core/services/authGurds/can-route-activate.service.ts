import { responseModel } from './../../models/response';
import { urls } from './../../helpers/urls/urls';
import { httpService } from './../http/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanRouteActivate implements CanActivate {

  constructor(private http: httpService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve , reject) => {
      this.http.Get(urls.CHECK_AUTH , {}).subscribe((isAuth: responseModel) => {
        if(!isAuth.error){
          console.log(isAuth)
          resolve(true)
        } else {
          this.router.navigateByUrl('/home/anonymous')
        }
      })
    })
  }
}
