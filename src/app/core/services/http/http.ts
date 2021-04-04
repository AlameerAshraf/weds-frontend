import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders  } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { headersModel } from "./headersModel";
import { throwError } from "rxjs";

@Injectable()
export class httpService  {

  constructor(private http: HttpClient) {

  }


  Get(url: string, params: any = null ,  headers: headersModel[] = null) {
    var requestUrl = this.GenerateUrl(url, params);
    var options = this.GenerateOptions(headers);

    return this.http
      .get(requestUrl, { headers : options })
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) {}
        })
      ).pipe(catchError((Error: Response) => {
        return this.ErrorHandler(Error);
      }))

  }

  Post(url: string, params: any = null , entity?: any,headers: headersModel[] = null) {
    var requestUrl = this.GenerateUrl(url, params);
    var options = this.GenerateOptions(headers);

    return this.http
      .post(requestUrl, entity )
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) {}
        })
      ).pipe(catchError((Error: Response) => {
        return this.ErrorHandler(Error);
      }))
  }

  Put(url: string, params: any = null, entity?: any, headers: headersModel[] = null) {
    var requestUrl = this.GenerateUrl(url, params);
    var options = this.GenerateOptions(headers);

    return this.http
      .put(requestUrl, entity)
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) {}
        })
      ).pipe(catchError((Error: Response) => {
        return this.ErrorHandler(Error);
      }))
  }


  // Generating the Request url aft er merging it with paramters ..
  private GenerateUrl(url: string, params: any) {

    if(params != null){
      var requestUrl: string;
      if(url.includes("?")){
        requestUrl = `${url}&`;
      } else {
        requestUrl = `${url}?`;
      }

      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          const value = params[param];
          requestUrl += `${param}=${value}&`;
        }
      }
      requestUrl = requestUrl.slice(0, -1);
      return requestUrl;
    } else {
      return url;
    }
  }

  // Global Error Handler
  private ErrorHandler(Error: Response) {
    if (Error.status === 404) {
      return throwError(Error);
    }
    else if (Error.status === 403) {
      window.location.href = 'en/home/anonymous'
    }
    else if (Error.status === 401) {
      window.location.href = 'en/home/anonymous'
    }
    else {
      return throwError(Error);
    }
  }

  // Return request's options
  private GenerateOptions(headers: headersModel[]): HttpHeaders {
    let request_headers = new HttpHeaders();
    if (headers != null) {
      headers.forEach(header => {
        request_headers = request_headers.set(header.headerName, header.headerContent);
      });
      return request_headers;
    } else {
      let request_headers = new HttpHeaders();
      return request_headers;
    }
  }
}
