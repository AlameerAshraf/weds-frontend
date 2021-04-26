import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class transporter {

  private objectSubject = new BehaviorSubject<any>(null);
  objectSubscriber = this.objectSubject.asObservable();

  objectPuplisher(object: any) {
    this.objectSubject.next(object);
  }
};
