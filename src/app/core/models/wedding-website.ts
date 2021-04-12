

export class weddingWebsite {
  themeId?: string;
  themeName?: string;
  preWeddingMaritalCeremony?: Date;
  weddingTime?: string;
  coverImage?: string;
  profileRouteURL?: string;
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

