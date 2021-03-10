import { AppConfig } from '../../config';



export class urls{
    public static _config: AppConfig;
    public static get BASE_URL(): string { return  urls._config.getConfig("BASE_URL")};
    public static get SERVER_URL(): string { return  urls._config.getConfig("SERVER_URL")};
    public static get PING(): string { return urls._config.getConfig("SSO_PING") };

    //SSO
    public static get SSO(): string { return this.PING + '/Home/auth?returnUrl=' };

    // utilities 
    public static get UTILITY() :string { return '/env' };


    // internal routes 
    public static get USER_DASHBOARD_INTERNAL() :string { return 'users/dashboard' };


    // API Controllers..
    public static get LOAD_DATA_FROM_BFO(): string { return this.BASE_URL + '/bFO/load-opportunity-data' };

    // offers URLs 
    public static get POST_OFFER_TO_SERVER(): string { return this.BASE_URL + '/offer/create' };
    public static get ASSIGN_OFFER(): string { return this.BASE_URL + '/offer/assign' };
    public static get GET_OFFER(): string { return this.BASE_URL + '/offer/load' };
    public static get GET_LATEST_OFFER_NUMBER(): string { return this.BASE_URL + '/offer/latest-offer-number' };
    public static get SUBMIT_OFFER(): string {return this.BASE_URL + '/offer/submit-offer'};
    public static get STARTING_APPROVAL_CYCLE(): string {return this.BASE_URL + '/offer/starting-approval-cycle'};
    public static get APPROVE_OFFER(): string {return this.BASE_URL + '/offer/approve'};
    public static get REJECT_OFFER(): string {return this.BASE_URL + '/offer/reject'};
    public static get ADDING_EXPENSES_TO_OFFER(): string {return this.BASE_URL + '/offer/save-general-expenses'};
    public static get LOADING_OFFER_EXPENSES(): string {return this.BASE_URL + '/offer/load-general-expenses'};
    public static get WIN_OFFER(): string {return this.BASE_URL + '/offer/win-offer'};
    public static get ASSIGN_OFFER_TO_PM(): string {return this.BASE_URL + '/offer/assign-offer-to-pm'}
    
    // orders URLs
    public static get CONVERT_TO_ORDER(): string {return this.BASE_URL + '/order/convert-to-order'}
    public static get APPROVE_ORDER(): string {return this.BASE_URL + '/order/approve-order'}
    public static get REJECT_ORDER(): string {return this.BASE_URL + '/order/reject-order'};
    public static get UPDATE_ORDER(): string {return this.BASE_URL + '/order/update-order'};
    public static get LOAD_ORDER(): string {return this.BASE_URL + '/order/load-order'};
    public static get SUBMIT_ORDER(): string {return this.BASE_URL + '/order/submit-order'};

    // users URLs
    public static get CREATE_NEW_USER(): string { return this.BASE_URL + '/user/create' };
    public static get GET_USERS_SUBORDINATES(): string { return this.BASE_URL + '/user/subordinates' };
    public static get GET_USERS_ROLES(): string { return this.BASE_URL + '/user/roles' };
    public static get UPDATE_USER_KPIS(): string { return this.BASE_URL + '/user/update/kpis' };
    public static get GET_ALL_TENDERING_ENGINEERS(): string {return this.BASE_URL + '/user/get-all-tendering-engineers'}
    public static get GET_ALL_MANAGERS(): string {return this.BASE_URL + '/user/load-managers'}
    public static get GET_ALL_EMPLOYEES(): string {return this.BASE_URL + '/user/load-employees'}
    public static get GET_PROJECT_MANAGERS(): string {return this.BASE_URL + '/user/get-project-managers'}

    // dashboards URLs
    public static get GET_USERS_OFFERS(): string { return this.BASE_URL + '/dashboard/offers' };
    public static get GET_USERS_KPIS(): string { return this.BASE_URL + '/dashboard/kpis' };
    public static get GET_FILTERS_COUNT(): string { return this.BASE_URL + '/dashboard/filters-count' };
    public static get DASHBOARD_SEARCH(): string { return this.BASE_URL + '/dashboard/search' };
    public static get GET_SALES_OFFERS(): string { return this.BASE_URL + '/dashboard/offers-for-sales' };
    public static get GET_PM_OFFERS(): string { return this.BASE_URL + '/dashboard/offers-for-pm' };
    public static get GET_USER_ORDERS(): string {return this.BASE_URL + '/dashboard/orders'}
    public static get GET_SALES_FILTERS_COUNT(): string {return this.BASE_URL + '/dashboard/sales-filters-count'}



    // Lookups URLs 
    public static get GET_COUNTRIES():string { return this.BASE_URL + '/lookup/countries' };
    public static get GET_EXPENSES():string { return this.BASE_URL + '/lookup/expenses' };
    public static get GET_CURRENCIES():string { return this.BASE_URL + '/lookup/currencies' };
    public static get GET_ROLES():string { return this.BASE_URL + '/lookup/roles' };
    public static get GET_SALES_ORGANIZATIONS():string { return this.BASE_URL + '/lookup/sales-organizations' };
    public static get GET_DISTRIBUTION_CHANNELS():string { return this.BASE_URL + '/lookup/distribution-channels' };
    public static get GET_DEVISIONS():string { return this.BASE_URL + '/lookup/devisions' };
    public static get GET_ORDER_TYPES():string { return this.BASE_URL + '/lookup/order-types' };
    public static get GET_CUSTOMERS():string { return this.BASE_URL + '/lookup/customers' };
    public static get GET_PAYMENT_TERMS():string { return this.BASE_URL + '/lookup/payment-terms' };
    public static get GET_END_USERS():string { return this.BASE_URL + '/lookup/end-users' };

    // Offer Items URLs 
    public static get BULK_INSERT_ITEMS_TO_OFFER(): string { return this.BASE_URL + '/item/create-items' };
    public static get LOAD_OFFER_ITEMS(): string { return this.BASE_URL + '/item/load-items' };
    public static get DELETE_ITEMS_FROM_OFFER(): string { return this.BASE_URL + '/item/delete-items' };
    public static get CLONE_ITEMS(): string { return this.BASE_URL + '/item/clone-items' };
    public static get ADD_EXPENSES(): string { return this.BASE_URL + '/item/add-expenses' };
    public static get LOAD_EXPENSES_FOR_ITEMS(): string { return this.BASE_URL + '/item/load-expenses-for-items' };

    
    // Admin URLs
    public static get LOAD_ALL_USERS(): string { return this.BASE_URL + '/admin/load-users' };
    public static get LOAD_LOGS_FOR_ACTIONS(): string { return this.BASE_URL + '/admin/logs' };
    public static get LOG_ADMIN_ACTION(): string { return this.BASE_URL + '/admin/log' };
    public static get DELETE_USER(): string { return this.BASE_URL + '/admin/delete-user' };
    public static get UPDATE_USER(): string { return this.BASE_URL + '/admin/update-user' };
    public static get DELEGATE_ROLE(): string { return this.BASE_URL + '/admin/delegate-role' };
    public static get LOAD_ALL_FAMILIES(): string { return this.BASE_URL + '/admin/load-families' };
    public static get UPDATE_FAMILY(): string { return this.BASE_URL + '/admin/update-family' };


    // Upload Files 
    public static get UPLOAD_COST_FILES(): string { return this.BASE_URL + '/upload/cost-files' };
    public static get UPLOAD_EXPENSES_CATEGORIES(): string { return this.BASE_URL + '/upload/expenses-categories' };
    public static get UPLOAD_FAMILIES_MASTER(): string { return this.BASE_URL + '/upload/families' };
    public static get UPLOAD_EXCHANGE_RATE(): string { return this.BASE_URL + '/upload/exchange-rates' };
    public static get UPLOAD_OFFER_DOCUMENTS(): string { return this.BASE_URL + '/upload/offer-documents' };
    public static get UPLOAD_PO(): string { return this.BASE_URL + '/upload/po' };

    //E2E 
    public static get E2E(): string { return this.BASE_URL + '/e2e/get-costing-summary' };


    // export reports
    public static get EXPORT_REPORTS(): string {return this.BASE_URL + '/exports'}
    // Download Url
    public static get DOWNLOAD(): string { return this.SERVER_URL + '/exported' };

    public static get UPLOAD_ORDER_TYPE(): string { return this.BASE_URL + '/upload/order-types' };
    public static get UPLOAD_CUSTOMER(): string { return this.BASE_URL + '/upload/customers' };
    public static get UPLOAD_DEVISION(): string { return this.BASE_URL + '/upload/devisions' };
    public static get UPLOAD_DISTRIBUTION_CHANNEL(): string { return this.BASE_URL + '/upload/distribution-channels' };
    public static get UPLOAD_PAYMENT_TERMS(): string { return this.BASE_URL + '/upload/payment-terms' };
    public static get UPLOAD_SALES_OFFICE(): string { return this.BASE_URL + '/upload/sales-office' };
    public static get UPLOAD_SALES_ORGANIZATION(): string { return this.BASE_URL + '/upload/sales-organizations' };
}