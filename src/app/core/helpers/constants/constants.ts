import { AppConfig } from '../../config';
import { urls } from '../urls';

export class constants {
  public static _config: AppConfig;
  

  public static get OFFER_STATUS() {
    enum OFFER_STATUS{
      "CREATED" = "CREATED",
      "ASSIGNED" = "ASSIGNED",
      "IN_PROGRESS" = "IN_PROGRESS",
      "CONFIGURED" = "CONFIGURED",
      "IN_APPROVAL_CYCLE" = "IN_APPROVAL_CYCLE",
      "APPROVED" = "APPROVED",
      "REJECTED" = "REJECTED",
      "SUBMITTED" = "SUBMITTED"
    };
    return OFFER_STATUS;
  };

  public static get STATUS_LABEL(){
    let offerStatusbasedOnOwner = {
      "OWNER" : {
        "IN_APPROVAL_CYCLE" : "Pending Approval",
        "ASSIGNED" : "Assigned",
        "CREATED" : "Created",
        "SUBMITTED" : "Submitted",
        "APPROVED" : "Approved",
        "WON" : "Won"
      },
      "NOT_OWNER" : {
        "IN_APPROVAL_CYCLE" : "Waiting approval",
        "ASSIGNED" : "Assigned",
        "CREATED" : "Created",
        "SUBMITTED" : "Submitted",
        "APPROVED" : "Approved",
        "WON" : "Won"
      }
    };

    return offerStatusbasedOnOwner;
  };

  public static get ACTIONS_PRIORITY_MAP(){
    let ACTIONS = {
      "PREVIEW" : 1,
      "CONFIGURE" : 2,
      "RECALL" : 2,
      "ASSIGN" : 3,
      "APPROVE" : 4,
      "PM" : 1
    };

    return ACTIONS;
  };

  public static get ACTIONS_FOR_SALES_OFFERS(){
    let actions = {
      "APPROVED" : [
        {
          "btnIcon" : "flag-outline",
          "toolTipTxt" : "Change offer status to Won",
          "handler" : "winAnOffer",
          "color" : "primary"
        },
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ],
      "WON" : [
        {
          "btnIcon" : "sync-outline",
          "toolTipTxt" : "Convert offer to an order",
          "handler" : "convertToOrder",
          "color" : "danger"
        },
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ],
      "WON_AND_CONVERTED" : [
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ] 
    };

    return actions;
  }

  public static get ACTIONS_FOR_PM_OFFERS(){
    let actions = {
      "APPROVED" : [
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ],
      "WON" : [
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ],
      "WON_AND_CONVERTED" : [
        {
          "btnIcon" : "info-outline",
          "toolTipTxt" : "View Offer's details",
          "handler" : "viewDetails",
          "color" : "info"
        }
      ] 
    };

    return actions;
  };

  public static get FILES_MAP_FOR_SERVER(){

    enum files {
      'EAS_BO_1' = 'EAS',
      'EAS_AUT' = "AUT",
      'Transfer_Price' = "TRANSFER_PRICE"
    };

    return files
  }

  public static get ACTIONS_FOR_SALES_ORDERS(){
    let actions = {
      "CREATED" : {
        "CONVERTER" : [
          {
            "btnIcon" : "settings-2-outline",
            "toolTipTxt" : "See order details, configure order data",
            "handler" : "configureOrder",
            "color" : "danger"
          }, 
        ] , 
        "PM" : [
          {
            "btnIcon" : "settings-2-outline",
            "toolTipTxt" : "See order details, configure order data",
            "handler" : "configureOrder",
            "color" : "danger"
          }, 
        ]
      },
      "SUBMITTED" : {
        "CONVERTER" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ],
        "MANAGER" : [
          {
            "btnIcon" : "checkmark-circle-outline",
            "toolTipTxt" : "Approve/Reject order",
            "handler" : "approveOrder",
            "color" : "success"
          }
        ],
        "PM" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ]
      },
      "IN_APPROVAL_CYCLE" : {
        "CONVERTER" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ],
        "MANAGER" : [
          {
            "btnIcon" : "checkmark-circle-outline",
            "toolTipTxt" : "Approve/Reject order",
            "handler" : "approveOrder",
            "color" : "success"
          }
        ],
        "PM" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ]
      },
      "APPROVED" : {
        "CONVERTER" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ],
        "MANAGER" : [
          {
            "btnIcon" : "info-outline",
            "toolTipTxt" : "Review order submitted data",
            "handler" : "viewOrderDetails",
            "color" : "info"
          }
        ],
        "PM" : [
          {
            "btnIcon" : "settings-2-outline",
            "toolTipTxt" : "See order details, configure order data",
            "handler" : "configureOrder",
            "color" : "danger"
          }, 
        ]
      }
    };

    return actions;
  }

  public static get DASHBOARD_ACTIONS() { 
    enum BTN_ACTIONS { 
      "PREVIEW" = "Preview",
      "CONFIGURE" = "Configure",
      "ASSIGN" = "Assign/preview",
      "APPROVE" = "Approve/Reject",
      "RECALL" = "Recall",
      "PM" = "Assign to PM"
    };

    return BTN_ACTIONS;
  }

  public static get OFFER_STATUS_COLOR() {
    let offerStatus = {
      "CREATED" : {
        "color" : "#00ccff" , "colorText" : "black"
      },
      "ASSIGNED" : {
        "color" : "#ff9900" , "colorText" : "black"
      },
      "SUBMITTED" : {
        "color" : "#9952f7" , "colorText" : "black"
      },
      "IN_APPROVAL_CYCLE" : {
        "color" : "#8c224c" , "colorText" : "white"
      },
      "APPROVED" : {
        "color" : "#28b567" , "colorText" : "white"
      },
      "REJECTED" : {
        "color" : "#ff3300" , "colorText" : "black"
      },
      "WON" : {
        "color" : "#006624" , "colorText" : "white"
      }
    };
    return offerStatus;
  };

  public static get ROLES() {
    enum ROLES { 
      "TENDERING_ENGINEER" = "TenderingEngineer",
      "TENDEDRING_MANAGER" = "TenderingManager",
      "SALES_MANAGER" = "SalesManager",
      "SALES_ENGINEER" = "SalesEngineer",
      "PROJECT_MANAGER" = "ProjectManager",
      "TOOL_ADMIN" = "ToolAdmin",
      "FINANCIAL_ADMIN" = "FinancialAdmin",
      "MARKETING_ADMIN" = "MarketingAdmin",
      "SUPER_ADMIN" = "SuperAdmin"
    };
    
    return ROLES;
  };

  public static get MENU_ITEMS_PER_ROLE(){
    let items = {
      "SuperAdmin" : [
        'ADMIN_SPLITTER',
        'ADMIN',
      ],
      "TenderingManager" : [
        "TENDERING_DASHBOARD",
        "OFFERS_SPLITTER",
        "CREATE_NEW_OFFER",
      ],
      "TenderingEngineer" : [
        "TENDERING_DASHBOARD",
      ],
      "SalesManager" : [
        "SALES_DASHBOARD"
      ],
      "SalesEngineer" : [
        "SALES_DASHBOARD"
      ],
      "ProjectManager" : [
        "PM_DASHBOARD"
      ],
      "PRIVACY": [
        'PRIVACY_SPLITTER',
        'PRIVACY_LINK'
      ]
    }
    return items;
  };

  public static get ROLE_NAMES(){
    enum ROLE_NAMES {
      "TENDERING_MANAGER" = "TENDERING_MANAGER",
      "TENDERING_ENGINEER" = "TENDERING_ENGINEER",
      "SALES_MANAGER" = "SALES_MANAGER",
      "SALES_ENGINEER" = "SALES_ENGINEER"
    };

    return ROLE_NAMES;
  };

  public static get KPIS_NAMES(){
    enum KPIS { 
      "IN_PROGRESS" = "In progress",
      "PENDING_APPROVAL" = "Pending Approval" ,
      "WAITING_FOR_APPROVAL" = "Waiting for approval",
      "APPROVED" = "Approved" ,
      "WON" = "Won",
      "DRAFT" = "Drafts",
      "CANCELED" = "Canceled"
    };

    return KPIS;
  };

  public static get LOG_ACTIONS_COLORS(){
    enum KPIS_COLORS { 
      "REVOKE" = "red",
      "GRANT" = "#05f05f" ,
      "CREATE" = "green",
      "UPDATE" = "blue",
      "DELETE" = "red" ,
      "DELEGATE" = "#9c1e3b"
    };

    return KPIS_COLORS;
  };

  public static get KPIS_COLORS(){
    enum KPIS_COLORS { 
      "IN_PROGRESS" = "info",
      "APPROVED" = "success" ,
      "WON" = "primary",
      "WAITING_FOR_APPROVAL" = "warning",
      "PENDING_APPROVAL" = "warning" ,
      "DRAFT" = "danger",
      "CANCELED" = "danger",
    };

    return KPIS_COLORS;
  };

  public static get KPIS_LABELS(){
    enum KPIS_LABELS {
      "IN_PROGRESS" = "Prepare & Bid",
      "APPROVED" = "Negotiate & Won" ,
      "WON" = "Convert to order",
      "WAITING_FOR_APPROVAL" = "",
      "PENDING_APPROVAL" = "" ,
      "DRAFT" = "",
      "CANCELED" = "Lost",
    };

    return KPIS_LABELS;
  }

  public static get ERROR_CODES(){
    enum errors {
      "DATA_BASE_CONNECTION_ERROR" = 1000,
      "INVALID_ACCESS_TOKEN" = 1001,
      "ERROR_LOADING_DATA_FROM_DATABASE" = 1002,
      "ERROR_LOADING_DATA_FROM_EXTERNAL_SOURCE" = 1003,
      "ENABLE_TO_SAVE_RECORD_TO_DATA_BASE" = 1004,
      "ENABLE_TO_UPDATE_RECORD_IN_DATA_BASE" =  1005,
      "DATA_NOT_FOUND" = 1006
    };
    return errors;
  };

  public static get ADMIN_UPLOADS_TYPES(){
    let admin = {
      "expenses" : { uploadingName : "Expenses Categories" , url: `${urls.UPLOAD_EXPENSES_CATEGORIES}` , sheetName : 'expenses'},
      "families" : { uploadingName : "Families Master File" , url: `${urls.UPLOAD_FAMILIES_MASTER}` , sheetName: 'familyMaster'},
      "rates" : { uploadingName : "Exchange Rate" , url: `${urls.UPLOAD_EXCHANGE_RATE}` , sheetName: 'exchangeRate'},
      "orders" : { uploadingName : "Order Type" , url: `${urls.UPLOAD_ORDER_TYPE}` , sheetName: 'orderType'},
      "customers" : { uploadingName : "Customer" , url: `${urls.UPLOAD_CUSTOMER}` , sheetName: 'customer'},
      "devisions" : { uploadingName : "Devision" , url: `${urls.UPLOAD_DEVISION}` , sheetName: 'devision'},
      "channels" : { uploadingName : "Distribution Channel" , url: `${urls.UPLOAD_DISTRIBUTION_CHANNEL}` , sheetName: 'distributionChannel'},
      "terms" : { uploadingName : "Payment Terms" , url: `${urls.UPLOAD_PAYMENT_TERMS}` , sheetName: 'paymentTerms'},
      "offices" : { uploadingName : "Sales Office" , url: `${urls.UPLOAD_SALES_OFFICE}` , sheetName: 'salesOffice'},
      "organizations" : { uploadingName : "Sales Organization" , url: `${urls.UPLOAD_SALES_ORGANIZATION}` , sheetName: 'salesOrganization'},
    };

    return admin
  }

  public static get EXCEL_REQUESTD_DATA_TYPES(){
    enum types {
      "CELL_VALUE" = "CELL_VALUE",
      "ROWS_AND_COLS" = "ROWS_AND_COLS"
    };

    return types;
  };

  public static get COST_FILES(){
    let easHeader = ["IG /OG", "Family", "Product", "description", "QTY", "unit TP", "TOTAL TP"];

    let costFiles = {
      "EAS_BO_1" : [
        { sheetName : "EAS BO 1" , cellValue : true , rowsCols : false , cells: ["H19" , "H21" , "H16" , "I19"] },
        { sheetName : "TP" , cellValue : false , rowsCols : true , header: easHeader},
      ],
      "EAS_AUT" : [
        { sheetName : "EAS AUT" , cellValue : true , rowsCols : false , cells: ["E73" , "E72" , "E63"]},
        { sheetName : "TP" , cellValue : false , rowsCols : true , header: easHeader},
      ],
      "Transfer_Price" : [
        { sheetName : "TP" , cellValue : false , rowsCols : true },
      ]
    };

    return costFiles;
  };

  public static get COST_FILES_NAMES(){
    enum names {
      "EAS_BO_1" = "EAS_BO_1",
      "EAS_AUT" = "EAS_AUT",
      "Transfer_Price" = "Transfer_Price"
    };

    return names;
  };

  public static get EXPENSES_VALUE_TYPES(){
    enum types {
      "Hours" = "H",
      "Amount" = "Money",
      "Percentage" = "%"
    };

    return types
  };

  public static get EXPENSES_TYPES(){
    enum types {
      "items" = "ITEM",
      "general" = "GENERAL",
    };

    return types
  };

  public static get OFFER_ITEMS_UI_HELPER_FIELDS(){
    return ["IS_SAVED" , "IS_LOADED_FROM_DB" , "weight" , "IS_SELECTED" , "UPLOADED_FROM"];
  };

  public static get SALES_ALLOWED_ITEMS(){
    return ["SellingPrice"]
  };

  public static get PM_ALLOWED_ITEMS(){
    return ["wbs"]
  };

  
  public static get PERCENTAGE_FIELDS() {
    return [
      "Expenses_Percentage" , "CCOGM_Percentage" , "sellingLocalMargin" , 
      "CCOGM_Percentage_Threshold", "Upstream_Percentage" , "sellingCCOCM_Percentage" ,
      "upstreamSFC_Percentage" , "fOSFC_Percentage" , "totalSFC_Percentage"
    ];
  };


  public static get REPORT_NAMES(){
    enum reports {
      "technical_offer" = "Technical Offer Documents",
      "commercial_offer" = "Commercial Offer Report",
      "rite_form" =  "RITE Form",
      "risk_and_opportunity" = "Risk and Opportunity Report",
      "family_report" = "Family summary report",
      "general_expenses_report" = "General expenses report",
      "detailed_report" = "Detailed summary report",
      "order_form" = "Order Form"
    };

    return reports;
  }
  



  public static get SERVER_ERROR(): string { return  this._config.getConst("SERVER_ERROR_MESSAGE")};
  public static get BFO_LOADING_ERROR(): string { return  this._config.getConst("BFO_LOADING_ERROR")};
  public static get SUCCESSFULL_SAVING(): string { return  this._config.getConst("SUCCESSFULL_SAVING")};
  public static get FAILURE_SAVING(): string { return  this._config.getConst("FAILURE_SAVING")};
  public static get LOGGED_IN_USER(): string { return  this._config.getConst("LOGGED_IN_USER")};
  public static get LOGGED_IN_USER_ROLES(): string { return  this._config.getConst("LOGGED_IN_USER_ROLES")};
}
