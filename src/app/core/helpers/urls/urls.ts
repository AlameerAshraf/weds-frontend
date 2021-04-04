import { AppConfig } from '../../config';



export class urls {
  public static _config: AppConfig;
  public static get BASE_URL(): string { return urls._config.getConfig("BASE_URL") };
  public static get SERVER_URL(): string { return urls._config.getConfig("SERVER_URL") };


  // Users ...
  public static get USER_SIGN_UP(): string { return this.BASE_URL + '/users/sign-up' };
  public static get USER_SIGN_IN(): string { return this.BASE_URL + '/users/sign-in' };
  public static get CHECK_AUTH(): string { return this.BASE_URL + '/users//check-auth' };
}
