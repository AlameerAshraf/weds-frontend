import { localStorageService } from './core/services/local-storage/local-storage';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storage: localStorageService, private router: Router){
    this.initUserNavigation();
  }

  /** Navigate the user based on the credentials */
  initUserNavigation(){
    let authCookies = this.storage.getCookie('WEDSUSER');
    if(authCookies == ''){
      if(!window.location.href.includes('security')){
        this.router.navigateByUrl(`/${environment.defaultLang}/home`);
      }
    }
  };
}
