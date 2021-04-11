import { AppConfig } from '../../config';
import { urls } from '../urls';

export class constants {
  public static _config: AppConfig;

  //** This is the mapper for the current view name, and the resources file! */
  public static get VIEWS(){
    return {
      "HOME_LAYOUT" : "home",
      "HEADER": "menu-items",
      "USER_DASHBOARD" : "user-profile-nav",
      "ADMIN_DASHBOARD" : "admin-profile-nav",
      "VENDOR_DASHBOARD" : "vendor-profile-nav",
    }
  };

  //** This is the account sources, from which the user logged in. */
  public static get ACCOUNT_SOURCES(){
    return {
      "WEDS360" : "WEDS360",
      "FACEBOOK" : "FACEBOOK",
      "GOOGLE" : "GOOGLE",
      "TWITTER" : "TWITTER"
    }
  };

  public static get USER_ROLES(){
    return {
      "USER" : "USER",
      "ADMIN" : "ADMIN",
      "VENDOR" : "VENDOR",
    }
  };

  public static get MONTHS(){
    return ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  };

  public static get GUESTS_STATUSES(){
    return {
      "NO_RESPONSE" : "Waiting his response",
      "GOING": "Coming ISA",
      "DECLINED" : "Sorry, will not able to come.",
    }
  };

  public static get SUGGESTED_BUDGET_VALUES(){
    return {
      "EXPENSIVELY" : 50000,
      "AFFORDABLY" : 25000,
      "CHEAPLY" : 10000,
      "FREELY" : 0,
    }
  };

  public static get THEMES(){
    return [
      {
        "route" : "spring",
        "name" : "Spring"
      },
      {
        "route" : "flowers",
        "name" : "Flowers & Spring"
      }
    ]
  };

  public static get S3_CONTAINERS(){
    return {
      "REGISTRY" : "REGISTRY",
      "VENDOR" : "VENDOR",
      "CATEGORIES_IMAGES" : "CATEGORIES_IMAGES",
      "CATEGORIES_ICONS" : "CATEGORIES_ICONS",
      "POSTS" : "POSTS",
      "THEMES" : "THEMES",
      "OFFERS" : "OFFERS",
    }
  };



  public static get APP_IDENTITY_FOR_USERS(): string { return  this._config.getConfig("CLIENT_IDENTITY_USERS")};
  public static get APP_IDENTITY_FOR_ADMINS(): string { return  this._config.getConfig("CLIENT_IDENTITY_ADMINS")};

  public static get SERVER_ERROR(): string { return  this._config.getConst("SERVER_ERROR_MESSAGE")};
  public static get BFO_LOADING_ERROR(): string { return  this._config.getConst("BFO_LOADING_ERROR")};
  public static get SUCCESSFULL_SAVING(): string { return  this._config.getConst("SUCCESSFULL_SAVING")};
  public static get FAILURE_SAVING(): string { return  this._config.getConst("FAILURE_SAVING")};
  public static get LOGGED_IN_USER(): string { return  this._config.getConst("LOGGED_IN_USER")};
  public static get LOGGED_IN_USER_ROLES(): string { return  this._config.getConst("LOGGED_IN_USER_ROLES")};
  public static get BASE_URL(): string { return  this._config.getConfig("BASE_URL")};
}
