import { AppConfig } from '../../config';
import { urls } from '../urls';

export class constants {
  public static _config: AppConfig;

  //** This is the mapper for the current view name, and the resources file! */
  public static get VIEWS() {
    return {
      "HOME_LAYOUT": "home",
      "HEADER": "menu-items",
      "USER_DASHBOARD": "user-profile-nav",
      "ADMIN_DASHBOARD": "admin-profile-nav",
      "VENDOR_DASHBOARD": "vendor-profile-nav",
      "LOGIN": "login",
      "OVERVIEW": "overview",
      "MESSAGES": "messages",
      "THEMES": "themes",
      "TAGS": "tags",
      "OFFERS": "offers",
      "WEBSITE_ADMIN": "website-admin",
      "CATEGORIES": "categories",
      "AREAS": "areas",
      "POSTS": "posts",
      "VENDORS": "vendor",
      "SERVICES": "services",
      "USERS": "users",
      "CHECKLIST": "checklist",
      "BUDGETERS": "budgeters",
      "EVENTS": "events",
      "REGISTRY": "registry",
      "PROFILE_LAYOUT": "profile-layout",
      "WEDDING_WEBSITE": "wedding-website",
      "WEDDING_DETAILS": "wedding-detail",
      "BOOKMARKS": "bookmarks",

    }
  };

  //** This is the account sources, from which the user logged in. */
  public static get ACCOUNT_SOURCES() {
    return {
      "WEDS360": "WEDS360",
      "FACEBOOK": "FACEBOOK",
      "GOOGLE": "GOOGLE",
      "TWITTER": "TWITTER"
    }
  };

  public static get USER_ROLES() {
    return {
      "USER": "USER",
      "ADMIN": "ADMIN",
      "VENDOR": "VENDOR",
    };
  };

  public static get USER_ROLES_LIST() {

    return [
      {
        "name": "USER",
      },
      {
        "name": "ADMIN"
      },
      {
        "name": "VENDOR"
      }
    ]
  }

  public static get MONTHS() {
    return ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  };

  public static get GUESTS_STATUSES() {
    return {
      "NO_RESPONSE": "Waiting his response",
      "GOING": "Coming ISA",
      "DECLINED": "Sorry, will not able to come.",
    }
  };

  public static get SUGGESTED_BUDGET_VALUES() {
    return {
      "EXPENSIVELY": 50000,
      "AFFORDABLY": 25000,
      "CHEAPLY": 10000,
      "FREELY": 0,
    }
  };

  public static get THEMES() {
    return [
      {
        "route": "spring",
        "name": "Spring"
      },
      {
        "route": "violet-flower",
        "name": "Violet flower"
      },
      {
        "route": "spring-garden",
        "name": "Spring garden"
      },
      {
        "route": "beach",
        "name": "Beach"
      },
      {
        "route": "read-heart",
        "name": "Red Heart"
      },
      {
        "route": "two-rings",
        "name": "Two Rings"
      },
      {
        "route": "floral",
        "name": "Floral"
      },
      {
        "route": "red-flowers",
        "name": "Red Flowers"
      },
      {
        "route": "flowers",
        "name": "Flowers"
      },
      {
        "route": "lovebook",
        "name": "Love book"
      },
      {
        "route": "paperpencil",
        "name": "Paper & Pencil"
      },
    ]
  };

  public static get SEGMENTS() {
    return [
      {
        "segment": "HIM",
        "name": "Him"
      },
      {
        "segment": "HER",
        "name": "Her"
      },
      {
        "segment": "WEDDING",
        "name": "Wedding"
      },
      {
        "segment": "PHOTOS",
        "name": "Photos"
      },
      {
        "segment": "POSTS",
        "name": "Posts"
      }
    ]
  };


  public static get PRICE_RANGE() {
    return [
      {
        "price_range": "UNSPECIFIED",
        "name": "UnSpecified"
      },
      {
        "price_range": "INEXPENSIVE",
        "name": "InExpensive"
      },
      {
        "price_range": "AFFORDABLE",
        "name": "Affordable"
      },
      {
        "price_range": "MODERATE",
        "name": "Moderate"
      },
      {
        "price_range": "EXPENSIVE",
        "name": "Expensive"
      }
    ]
  };

  public static get PURITY() {
    return [
      {
        "purity": "D_E_F",
        "name": "D_E_F"
      },
      {
        "purity": "H_I_J",
        "name": "H_I_J"
      },
      {
        "purity": "K_L_M",
        "name": "K_L_M"
      },
      {
        "purity": "N_O_P_Q_R",
        "name": "N_O_P_Q_R"
      },
      {
        "purity": "D_T_U_V_X_Y_Z",
        "name": "D_T_U_V_X_Y_Z"
      }
    ]
  };

  public static get CLARITY() {
    return [
      {
        "clarity": "FL_IF",
        "name": "FL_IF"
      },
      {
        "clarity": "VVS1_VVS2",
        "name": "VVS1_VVS2"
      },
      {
        "clarity": "VS1_VS2",
        "name": "VS1_VS2"
      },
      {
        "clarity": "SI1_SI2",
        "name": "SI1_SI2"
      },
      {
        "clarity": "I1",
        "name": "I1"
      },
      {
        "clarity": "I2",
        "name": "I2"
      },
      {
        "clarity": "I3",
        "name": "I3"
      }
    ]
  };

  public static get STONE_SHAPE() {
    return [
      {
        "stone_shape": "CUSHION",
        "name": "Cushion"
      },
      {
        "stone_shape": "EMERALD",
        "name": "Emerald"
      },
      {
        "stone_shape": "HEART",
        "name": "Heart"
      },
      {
        "stone_shape": "PEAR",
        "name": "Pear"
      },
      {
        "stone_shape": "PRINCESS",
        "name": "Princess"
      },
      {
        "stone_shape": "RADIANT",
        "name": "Radiant"
      },
      {
        "stone_shape": "ROUND",
        "name": "Round"
      }
    ]
  };

  public static get DRESS_CUT() {
    return [
      {
        "dress_cut": "SHORT",
        "name": "Short"
      },
      {
        "dress_cut": "MERMAID",
        "name": "Mermaid"
      },
      {
        "dress_cut": "SHEATH",
        "name": "Sheath"
      },
      {
        "dress_cut": "BALL_GOWN",
        "name": "Ball_gown"
      },
      {
        "dress_cut": "A_LINE",
        "name": "a_line"
      }
    ]
  };


  public static get LAYOUTS() {
    return [
      {
        "layout": "DRESSES",
        "name": "Dress"
      },
      {
        "layout": "RINGS",
        "name": "Ring"
      },
      {
        "layout": "SERVICES",
        "name": "Service"
      },
      {
        "layout": "PHOTOS",
        "name": "Photos"
      },
      {
        "layout": "POSTS",
        "name": "Posts"
      }
    ]
  };

  public static get S3_CONTAINERS() {
    return {
      "REGISTRY": "REGISTRY",
      "VENDOR": "VENDOR",
      "CATEGORIES_IMAGES": "CATEGORIES_IMAGES",
      "CATEGORIES_ICONS": "CATEGORIES_ICONS",
      "POSTS": "POSTS",
      "THEMES": "THEMES",
      "OFFERS": "OFFERS",
      "AREAS": "AREAS",
      "WEDDING_WEBSITES": "WEDDING_WEBSITES",
      "WEDDING_ALBUMS": "WEDDING_ALBUMS",
      "VENDOR_ALBUMS": "VENDOR_ALBUMS",
      "VENDOR_SERVICES": "VENDOR_SERVICES",
      "VISITORS_WEDDING_SITE": "VISITORS_WEDDING_SITE"
    }
  };



  public static get APP_IDENTITY_FOR_USERS(): string { return this._config.getConfig("CLIENT_IDENTITY_USERS") };
  public static get APP_IDENTITY_FOR_ADMINS(): string { return this._config.getConfig("CLIENT_IDENTITY_ADMINS") };

  public static get SERVER_ERROR(): string { return this._config.getConst("SERVER_ERROR_MESSAGE") };
  public static get BFO_LOADING_ERROR(): string { return this._config.getConst("BFO_LOADING_ERROR") };
  public static get SUCCESSFULL_SAVING(): string { return this._config.getConst("SUCCESSFULL_SAVING") };
  public static get FAILURE_SAVING(): string { return this._config.getConst("FAILURE_SAVING") };
  public static get LOGGED_IN_USER(): string { return this._config.getConst("LOGGED_IN_USER") };
  public static get LOGGED_IN_USER_ROLES(): string { return this._config.getConst("LOGGED_IN_USER_ROLES") };
  public static get BASE_URL(): string { return this._config.getConfig("BASE_URL") };

  public static get FACEBOOK_APP_ID(): string { return this._config.getConfig("FACEBOOK_OAUTH_APP_ID_DEBUGE") };
  public static get GOOGLE_CLIENT_ID(): string { return this._config.getConfig("GOOGLE_OAUTH_CLIENT_ID") };

}
