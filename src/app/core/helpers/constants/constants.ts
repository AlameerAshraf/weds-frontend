import { AppConfig } from '../../config';
import { urls } from '../urls';

export class constants {
  public static _config: AppConfig;
  

  public static get SERVER_ERROR(): string { return  this._config.getConst("SERVER_ERROR_MESSAGE")};
  public static get BFO_LOADING_ERROR(): string { return  this._config.getConst("BFO_LOADING_ERROR")};
  public static get SUCCESSFULL_SAVING(): string { return  this._config.getConst("SUCCESSFULL_SAVING")};
  public static get FAILURE_SAVING(): string { return  this._config.getConst("FAILURE_SAVING")};
  public static get LOGGED_IN_USER(): string { return  this._config.getConst("LOGGED_IN_USER")};
  public static get LOGGED_IN_USER_ROLES(): string { return  this._config.getConst("LOGGED_IN_USER_ROLES")};
  public static get BASE_URL(): string { return  this._config.getConfig("BASE_URL")};
}
