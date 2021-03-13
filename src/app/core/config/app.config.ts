import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { constants, urls } from "../helpers";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
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

  async load(): Promise<any> {
    let currentEnv = environment.production ? "production" : "development";
    return this.getFiles(currentEnv).then((result) => {
      this.const = result[0];
      this.config = result[1];
    })
  }

  getFiles(env: string) {
    let constFile = this.getConstFile(env).toPromise();
    let configFile = this.getConfigFile(env).toPromise();
    return Promise.all([constFile , configFile]);
  }

  getConfigFile(env: string) {
    return this.http.get(`config.${env}.json`).pipe(map(res => res));
  };

  getConstFile(env: string) {
    return this.http.get(`const.${env}.json`).pipe(map(res => res));
  };
}
