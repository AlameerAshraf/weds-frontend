

export class socialSharing{
  public static navUrl = '';

  public static createNavigationUrl(type , shareUrl) {
    let searchParams = new URLSearchParams();
    switch(type) {
      case 'facebook':
        searchParams.set('u', shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        this.share();
        break;
      case 'twitter':
        searchParams.set('url', shareUrl);
        this.navUrl =  'https://twitter.com/share?' + searchParams;
        this.share();
        break;
      case 'pinterest':
        this.navUrl =  'http://pinterest.com/pin/create/link/?url=' + shareUrl;
        this.share();
        break;
    }
  }

  public static share() {
    return window.open(this.navUrl, "_blank");
  }
}
