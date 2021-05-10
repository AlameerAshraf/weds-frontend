import { urls } from 'src/app/core';
import { Injectable } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class Common {
  public baseUrl: string;
  public baseUrlWithLang: string;
  public isArabicLanuage: boolean;
  public basUrlLanguageSwitch: string

  constructor(private route: ActivatedRoute) {
    this.baseUrl = null;
    this.baseUrl = this.getBaseUrl();
    this.isArabicLanuage = this.isArabicLanguage();
    this.basUrlLanguageSwitch = this.changeLanguge();
  }
  private getBaseUrl(): string {
    if (this.baseUrl != null || this.baseUrl != "")
      this.baseUrl = window.location.origin;
    return this.baseUrl;
  }
  private isArabicLanguage(): boolean {
    if (
      window.location.href.toLowerCase().indexOf(`/en/`) > -1 ||
      window.location.href.toLowerCase().indexOf(`/en`) > -1
    ) {
      {
        this.baseUrlWithLang = `${this.baseUrl}/en/`;
        return false;
      }
    } else {
      {
        this.baseUrlWithLang = `${this.baseUrl}/ar/`;
        return true;
      }
    }
  }
  public changeLanguge() {
    const originURL = window.location.origin.toString().toLowerCase();
    const baseUrl = window.location.href.toString().toLowerCase();
    let url = this.isArabicLanguage() ? baseUrl.replace('/ar/', '/en/') : baseUrl.replace('/en/', '/ar/')
    // window.location.href = urls
    url = url.replace(originURL, '');
    return url
  }
  public getRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }
}
