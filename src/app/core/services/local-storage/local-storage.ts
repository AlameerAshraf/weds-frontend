import { Injectable } from "@angular/core";


@Injectable()
export class localStorageService {

    setCookie(name: string, content:any, path: string, expiresIn:any) {
        let cookiePath = path ? `; path=${path}` : '';
        document.cookie = `${name}=${content}; expires=${expiresIn}${cookiePath}`;
    }

    getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    eraseCookie(name: string){
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    eraseAllCookies(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    setLocalStorage(name: string , content: any){
        let storageContent = "";
        if(typeof content == 'object'){
            storageContent = JSON.stringify(content);
        }
        else {
            storageContent = content;
        }
        window.localStorage.setItem(name , storageContent);
    }

    getLocalStorage(name: string): any{
        let content = "";
        let item = window.localStorage.getItem(name);
        if(item){
            if(item.indexOf("{") !== -1 || item.indexOf("}") !== -1 ){
                content = JSON.parse(item);
            } 
            else {
                content = item;
            }
            return content;
        }
    }

    eraseLocalStorage(name: string){
        window.localStorage.removeItem(name);
    }

    eraseAllLocalStorage(){
        window.localStorage.clear();
    }
}