

export class post {
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  category?: string;
  tagsEn?: any[] = [];
  tagsAr?: any[] = [];
  isAuthorVisible?: boolean = false;
  author?: string;
  scheduledAt?: Date;
  isScheduledPost?: boolean = false;
  featuredImage?: string = "";
  featuredVideo?: string = "";
  bodyContentEn?: string;
  bodyContentAr?: string;
  metaDescriptionEn?: string;
  metaDescriptionAr?: string;
  readingTime?: number;
  relatedPosts?: any[] = [];
  images?: { id:string; url: string , arabicDesc: string, englishDesc: string }[] = [];
}
