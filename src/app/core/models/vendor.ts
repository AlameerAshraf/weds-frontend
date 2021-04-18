export class vendor {
    _id?: string;
    nameEn?: string = "";
    nameAr?: string = "";
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
    };
    order?: number = 0;
    arTags: [string];
    enTags: [string];
    gallery: [];
    isFeatured?: Boolean = false;
    featuredImage?: string = "";
    featuredVideo?: string = "";
    numberOfBookmarks?: number = 0;
    numberOfLoves?: number = 0;
    ranks: [
        {
            user?: string
            criteria?: string
            value?: number
        }
    ];
    comments: [{
        userEmail?: string
        body?: string
        likes?: number
        date?: Date
    }];
    services: [];
    social : [
        {
          source?: string
          url ?: string
        }
      ];
};
