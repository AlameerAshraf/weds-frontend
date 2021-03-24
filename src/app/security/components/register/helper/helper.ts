import { constants , resources } from './../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

export class helper {
  lang: string;

  constructor(private router: Router, private actictedRoute: ActivatedRoute, private resources: resources) {
  };


  /** Use this function at each view to load corrosponding resources! */
  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);

    return {
      lang: lang,
      translatedObject: resData
    };
  };

  /** Change the type for who is registerating now! */
  changeRegisterationType(type: string) {
    if (type == "user") window.location.href = "/security/ar/register";
    else window.location.href = `/security/ar/register?vendor=join`
  };

  /** Change the type for who is registerating now! */
  navigateToLogin() {
    this.router.navigateByUrl(`/security/${this.lang}/login`);
  };
};
