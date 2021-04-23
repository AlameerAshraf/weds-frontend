export class vendorService {
    _id?: string;
    type?: string = "";
    isActive?: Boolean = true;
    vendor?: string;
    vendorNameEn?: string;
    vendorNameAr?: string;
    order?: Number = 0;
    arTags: any[] = [];
    enTags: any[] = [];
    numberOfBookmarks?: Number = 0;
    numberOfLoves?: Number = 0;
    ranks: { user?: string, criteria?: string, value?: Number }[] = [];
    comments: { userEmail?: string, body?: string, likes?: Number, date?: Date }[] = [];
    attributes: any = {};
};
