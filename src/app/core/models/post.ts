

export class post {
  _id?: string;
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  category?: string;
  tagsEn?: any[] = [];
  tagsAr?: any[] = [];
  isAuthorVisible?: boolean = false;
  author?: string;
  scheduledAt?: string;
  isScheduledPost?: boolean = false;
  featuredImage?: string = "";
  featuredVideo?: string = "";
  bodyContentEn?: string;
  bodyContentAr?: string;
  bodyArURL?: string;
  bodyEnURL?: string;
  metaDescriptionEn?: string;
  metaDescriptionAr?: string;
  readingTime?: number;
  relatedPosts?: any[] = [];
  images?: { id:string; url: string , arabicDesc: string, englishDesc: string }[] = [];
  publishedAt?: string;
  authorName?: string;
  categoryName?: string;
  isPublished?: boolean = false;
  isRemoved?: boolean = false;
}
