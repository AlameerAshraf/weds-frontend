

export class weddingWebsite {
  requestIssued?: boolean = false;
  themeId?: string;
  themeName?: string;
  preWeddingMaritalCeremony?: string;
  weddingTime?: string;
  coverImage?: string;
  routeURL?: string;
  story?: string;
  album?: string [];
  isPublished?: boolean = false;
  location?: {
    venue: string;
    address: string;
    latitude: number;
    longtitude: number;
    country: string;
    city: string;
    area: string;
    street: string;
  };
  addressDetails ?:any[] = [];
}

