import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class resources {
    constructor(private http: HttpClient) {
    }


    async load(lang: string, viewName: string) {
        return await new Promise((resolve, reject) => {
            this.http.get(`assets/resources/${lang}/${viewName}.json`).subscribe((resources: any) => {
                resolve({ error: false, res: resources });
            }, (err) => {
                reject({ error: true, e: err })
            })
        });
    };
}