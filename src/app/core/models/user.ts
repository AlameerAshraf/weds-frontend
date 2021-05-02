export class user {
  _id?: string;
  name?: string = "";
  age?: string = "";
  gender?: string = "";
  phone?: string = "";
  email?: string = "";
  dateOfBirth?: string ="";
  role?: string = "";
  isActive?: Boolean = true;
  isEmailConfirmed?: Boolean = false;
  isAccountLocked?: Boolean = false;
  password?: string = "";
  accountSource?: string = "WEDS360";
  address?: {
    latitude?: number,
    longtitude?: number,
    country?: string,
    city?: string,
    area?: string,
    street?: string,
    address?: string,
  } = { longtitude: 0 , latitude: 0 , area: "", city: "" , country: "" , street: "" , address: "" };
  social: string[] = [];
  settings: {
    avatar?: string;
    cover?: string;
    notifyBlogs?: boolean;
    notifyAnnouncemnets?: boolean;
    notifyVendors?: boolean;
    notifyOffers?: boolean;
    notifyBot?: boolean;
  } = { avatar: "" , cover: "", notifyAnnouncemnets: true, notifyBlogs: true , notifyBot: true , notifyOffers: true , notifyVendors: true };
  bookmarks: { type: string, id: string }[] = [];
};
