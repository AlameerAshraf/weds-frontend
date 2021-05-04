export class category {
    _id?: string;
    nameEn?: string = "";
    nameAr?: string = "";
    name?:string = "";

    isHidden?: boolean = false;
    order?: number = 0;

    descriptionEn?: string = "";
    descriptionAr?: string = "";
    description?: string = "";

    subDescriptionEn?: string = "";
    subDescriptionAr?: string = "";
    subDescription?: string = "";


    parentMenu?: string = "";
    layout?: string = "";
    photo?: string = "";
    icon?: string = "";
    isRemoved?: boolean = false;
};
