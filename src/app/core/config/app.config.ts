import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { forkJoin, Observable } from 'rxjs';
import { constants, urls } from "../helpers";
import { map } from 'rxjs/operators';

@Injectable()
export class AppConfig {
  private config: Object = null;
  private const: Object = null;
  private env: Object = null;

  constructor(private http: HttpClient) {
    urls._config = this;
    constants._config = this;
  }

  public getConfig(key: any) {
    return this.config[key];
  }

  public getConst(key: any) {
    return this.const[key];
  }

  public getEnv(key: any) {
    return this.env[key];
  }

  public async load() {
    return await new Promise((resolve, reject) => {
      this.http.get("env.json").subscribe((envResponse: any) => {
        this.env = envResponse;

        let files = forkJoin(
          this.getConfigFile(envResponse.env),
          this.getConstFile(envResponse.env)
        ).subscribe((result) => {
          this.const = result[0];
          this.config = result[1];
          resolve(true)
        })
      });
    });
  }

  getConstFile(env: string) {
    return this.http.get(`config.${env}.json`).pipe(map(res => res));
  }

  getConfigFile(env: string) {
    return this.http.get(`const.${env}.json`).pipe(map(res => res));
  }
}
