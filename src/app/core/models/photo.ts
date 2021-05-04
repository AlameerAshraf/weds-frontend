export class photo {
    _id?: string;
    titleEn?: string;
    titleAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    tagAr: any[] = [];
    tagEn: any[] = [];
    category?: string = "";
    vendor?: string = "";
    image?: string = "assets/images/defaults/wedding/cover-photo.png";
  };
  