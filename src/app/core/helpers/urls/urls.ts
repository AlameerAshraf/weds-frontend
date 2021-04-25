import { AppConfig } from '../../config';



export class urls {
  public static _config: AppConfig;
  public static get BASE_URL(): string { return urls._config.getConfig("BASE_URL") };
  public static get SERVER_URL(): string { return urls._config.getConfig("SERVER_URL") };

  // Uploading
  public static get UPLOAD_IMAGE(): string { return this.BASE_URL + '/upload/image' };

  // Users ...
  public static get USER_SIGN_UP(): string { return this.BASE_URL + '/users/sign-up' };
  public static get USER_SIGN_IN(): string { return this.BASE_URL + '/users/sign-in' };
  public static get CHECK_AUTH(): string { return this.BASE_URL + '/users/check-auth' };
  public static get GET_ALL_USERS(): string { return this.BASE_URL + '/users/get-all-users'};
  public static get GET_USER_DATA(): string { return this.BASE_URL + '/users/get-user'};
  public static get CREATE_USER(): string { return this.BASE_URL + '/users/sign-up'};
  public static get UPDATE_USER(): string { return this.BASE_URL + '/users/update-user-personal-info'};
  public static get DELETE_USER(): string { return this.BASE_URL + '/users/delete-user'};

  // Admin!
  public static get GET_ALL_CATEGORIES(): string { return this.BASE_URL + '/admin/get-all-categories' };
  public static get GET_ALL_AREAS(): string { return this.BASE_URL + '/admin/get-all-areas' };
  public static get GET_ALL_THEMES(): string { return this.BASE_URL + '/admin/get-all-themes'};
  public static get CREATE_THEME(): string { return this.BASE_URL + '/admin/create-theme'};
  public static get UPDATE_THEME(): string { return this.BASE_URL + '/admin/update-theme'};
  public static get GET_ALL_TAGS(): string { return this.BASE_URL + '/admin/get-all-tags'};
  public static get GET_ALL_OFFERS(): string { return this.BASE_URL + '/admin/get-all-offers'};
  public static get GET_ALL_EVENTS(): string { return this.BASE_URL + '/users/events/get-all-events'};
  public static get GET_ALL_POSTS(): string { return this.BASE_URL + '/admin/get-all-posts'};
  public static get CREATE_AREA(): string { return this.BASE_URL + '/admin/create-area'};
  public static get UPDATE_AREA(): string { return this.BASE_URL + '/admin/update-area'};
  public static get CREATE_CATEGORY(): string { return this.BASE_URL + '/admin/create-new-category'};
  public static get UPDATE_CATEGORY(): string { return this.BASE_URL + '/admin/update-category'};
  public static get CREATE_TAG(): string { return this.BASE_URL + '/admin/create-new-tag'};
  public static get UPDATE_TAG(): string { return this.BASE_URL + '/admin/update-tag'};
  public static get CREATE_OFFER(): string { return this.BASE_URL + '/admin/create-new-offer'};
  public static get UPDATE_OFFER(): string { return this.BASE_URL + '/admin/update-offer'};
  public static get CREATE_CHECKLIST_ADMIN(): string { return this.BASE_URL + '/admin/create-check-list-item'};
  public static get UPDATE_CHECKLIST_ADMIN(): string { return this.BASE_URL + '/admin/update-check-list-item'};
  public static get GET_ALL_CHECKLISTS_ADMIN(): string { return this.BASE_URL + '/admin/get-all-check-list-items'};
  public static get CREATE_BUDGETER_ADMIN(): string { return this.BASE_URL + '/admin/create-default-budgeter'};
  public static get UPDATE_BUDGETER_ADMIN(): string { return this.BASE_URL + '/admin/update-default-budgeter'};
  public static get GET_ALL_BUDGETER_ADMIN(): string { return this.BASE_URL + '/admin/get-all-default-budgeters'};
  public static get DELETE_AREA(): string { return this.BASE_URL + '/admin/delete-area'};
  public static get DELETE_BUDGETER_ADMIN(): string { return this.BASE_URL + '/admin/delete-default-budgeter'};
  public static get DELETE_CATEGORY(): string { return this.BASE_URL + '/admin/delete-category'};
  public static get DELETE_THEME(): string { return this.BASE_URL + '/admin/delete-theme'};
  public static get DELETE_TAG(): string { return this.BASE_URL + '/admin/delete-tag'};
  public static get DELETE_OFFER(): string { return this.BASE_URL + '/admin/delete-offer'};
  public static get DELETE_CHECKLIST_ADMIN(): string { return this.BASE_URL + '/admin/delete-check-list-item'};
  public static get CREATE_POST(): string { return this.BASE_URL + '/admin/create-post'};
  public static get UPDATE_POST(): string { return this.BASE_URL + '/admin/update-post'};
  public static get GET_ALL_POSTS_AS_LOOKUPS(): string { return this.BASE_URL + '/admin/get-all-posts-as-lookups'};

  //Checklists
  public static get CREATE_CHECKLIST(): string { return this.BASE_URL + '/wedding/create-new-checklist'};
  public static get GET_ALL_CHECKLISTS(): string { return this.BASE_URL + '/wedding/get-checklist'};
  public static get UPDATE_CHECKLIST(): string { return this.BASE_URL + '/wedding/update-checklist'};

  // Budgeter
  public static get CREATE_BUDGETER_ITEM(): string { return this.BASE_URL + '/wedding/create-new-budget-item'};
  public static get GET_ALL_BUDGET_ITEMS(): string { return this.BASE_URL + '/wedding/get-budget-items'};
  public static get UPDATE_BUDGETER_ITEM(): string { return this.BASE_URL + '/wedding/update-budget-item'};
  public static get DELETE_BUDGET_ITEM(): string { return this.BASE_URL + '/wedding/delete-budget-item'};

  //Wedding
  public static get UPDATE_WEDDING_DATA(): string { return this.BASE_URL + '/wedding/update-wedding'};
  public static get GET_ALL_WEDDING_LIST(): string { return this.BASE_URL + '/wedding/get-all-wedding-website-requests'};
  public static get CREATE_WEDDING_WEBSITE(): string { return this.BASE_URL + '/wedding/create-weedding-website'};
  public static get GET_WEDDING_WEBSITE_DETAILS(): string { return this.BASE_URL + '/wedding/get-weedding-website-details'};

  //Events
  public static get CREATE_EVENT(): string { return this.BASE_URL + '/users/events/create-new-event'};
  public static get GET_EVENTS_PER_USER(): string { return this.BASE_URL + '/users/events/get-all-events'};
  public static get INVITE_TO_EVENT(): string { return this.BASE_URL + '/users/events/invite'};
  public static get GET_GUEST_list_PER_EVENT(): string { return this.BASE_URL + '/users/events/get-all-guests'};
  public static get UPDATE_EVENT(): string { return this.BASE_URL + '/users/events/update-event'};
  public static get DELETE_EVENT(): string { return this.BASE_URL + '/users/events/delete-event'};


  //Registry
  public static get CREATE_REGISTRY_LIST_ITEM(): string { return this.BASE_URL + '/wedding/add-registry-list'};
  public static get GET_REGISTRY_LIST_PER_USER(): string { return this.BASE_URL + '/wedding/get-all-registry-list'};
  public static get UPDATE_REGISTRY_LIST_PER_USER(): string { return this.BASE_URL + '/wedding/update-registry-list'};
  public static get DELETE_REGISTRY_LIST(): string { return this.BASE_URL + '/wedding/delete-registry-list'};


  //Wedding website
  public static get CHECK_WEDDING_WEBSITE_UNIQNESS(): string { return this.BASE_URL + '/wedding/checking-website-routing-uniqueness'};


  //Vendor
  public static get GET_ALL_VENDORS(): string { return this.BASE_URL + '/vendors/get-all-vendors'};
  public static get CREATE_VENDOR(): string { return this.BASE_URL + '/vendors/create-new-vendor'};
  public static get UPDATE_VENDOR(): string { return this.BASE_URL + '/vendors/update-vendor'};
  public static get DELETE_VENDOR(): string { return this.BASE_URL + '/vendors/delete-vendor'};
  public static get GET_ALL_VENDOR_SERVICES(): string { return this.BASE_URL + '/vendors/get-all-vendor-services'};
  public static get GET_VENDOR_BY_ID(): string { return this.BASE_URL + '/vendors/get-vendor-by-id'};
  public static get CREATE_NEW_COMMENT(): string { return this.BASE_URL + '/vendors/create-new-comment'};
  public static get GET_ALL_COMMENTS(): string { return this.BASE_URL + '/vendors/get-all-comments'};


  // Authed ..
  public static get GET_FEATURED_VENDORS(): string { return this.BASE_URL + '/vendor/get-featured-vendors' };


}
