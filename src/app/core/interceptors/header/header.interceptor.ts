
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';
import { localStorageService } from './../../services/local-storage/local-storage';


@Injectable()
export class headerInterceptor implements HttpInterceptor {
    token: any;

    constructor(private localStorageService: localStorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.localStorageService.getLocalStorage("weds360#data");

        let access_token = "";
        if(typeof this.token == "undefined")
            access_token = "";
        else
            access_token = this.token || "";

        req = req.clone({
            headers : req.headers.set('x-access-token' , access_token)
        });

        return next.handle(req);
    }
}
