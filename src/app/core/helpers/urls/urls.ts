import { AppConfig } from '../../config';



export class urls {
  public static _config: AppConfig;
  public static get BASE_URL(): string { return urls._config.getConfig("BASE_URL") };
  public static get SERVER_URL(): string { return urls._config.getConfig("SERVER_URL") };


  // Users ...
  public static get USER_SIGN_UP(): string { return this.BASE_URL + '/users/sign-up' };
  public static get USER_SIGN_IN(): string { return this.BASE_URL + '/users/sign-in' };
  public static get CHECK_AUTH(): string { return this.BASE_URL + '/users/check-auth' };

  // Admin!
  public static get GET_ALL_CATEGORIES(): string { return this.BASE_URL + '/admin/get-all-categories' };
  public static get GET_ALL_AREAS(): string { return this.BASE_URL + '/admin/get-all-areas' };
  public static get GET_ALL_THEMES(): string { return this.BASE_URL + '/admin/get-all-themes'};
  public static get GET_ALL_TAGS(): string { return this.BASE_URL + '/admin/get-all-tags'};
  public static get GET_ALL_OFFERS(): string { return this.BASE_URL + '/admin/get-all-offers'};
  public static get GET_ALL_EVENTS(): string { return this.BASE_URL + '/users/events/get-all-events'};
  public static get GET_ALL_POSTS(): string { return this.BASE_URL + '/admin/get-all-posts'};

  //Checklists
  public static get CREATE_CHECKLIST(): string { return this.BASE_URL + '/wedding/create-new-checklist'};
  public static get GET_ALL_CHECKLISTS(): string { return this.BASE_URL + '/wedding/get-checklist'};
  public static get UPDATE_CHECKLIST(): string { return this.BASE_URL + '/wedding/update-checklist'};


  // Authed ..
  public static get GET_FEATURED_VENDORS(): string { return this.BASE_URL + '/vendor/get-featured-vendors' };
}
