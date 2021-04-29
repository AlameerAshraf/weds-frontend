import { comment } from "./comment";

export class vendor {
    _id?: string;
    username?: string = "";
    nameEn?: string = "";
    nameAr?: string = "";
    phone?: string ="";
    email?: string = "";
    priceRange?: string = "";
    shortDescriptionAr?: string = "";
    shortDescriptionEn?: string = "";
    websiteURL?: string = "";
    category?: string = "";
    segment?: string = "";
    descriptionURLAr?: string = "";
    descriptionURLEn?: string = "";
    descriptionAr?: string = "";
    descriptionEn?: string = "";
    area: [];
    location: {
        latitude?: string
        longtitude?: string
        typedAddress?: string
        guestCount?: number
    } = { latitude: "23" , longtitude: "23" }
    order?: number = 0;
    arTags: [];
    enTags: [];
    gallery: any[] = [];
    isFeatured?: Boolean = false;
    isPublished?: boolean = false;
    isApproved?: boolean = false;
    isActive?: boolean = false;
    featuredImage?: string = "";
    featuredVideo?: string = "";
    numberOfBookmarks?: number = 0;
    numberOfLoves?: number = 0;
    ranks: { user?: string, criteria?: string, value?: number, userEmail?: string }[] = [];
    comments: comment[] = [];
    services: [];
    social: string[]=[] ;
    categoryEnglish?: string;
    categoryArabic?: string;
    avatar?: string;
};
