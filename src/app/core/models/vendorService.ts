export class vendorService {
    _id?: string;
    name?: string = "";
    url?: string = "";
    image?: string = "";
    type?: string = "";
    isActive?: Boolean = true;
    vendor: any[] = [];
    order?: Number = 0;
    arTags: any[] = [];
    enTags: any[] = [];
    numberOfBookmarks?: Number = 0;
    numberOfLoves?: Number = 0;
    ranks: { user?: string, criteria?: string, value?: Number }[] = [];
    comments: { userEmail?: string, body?: string, likes?: Number, date?: Date }[] = [];
    attributes
};
