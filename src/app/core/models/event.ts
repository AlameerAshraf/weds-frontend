export class event {
  name: string;
  description: string ;
  date: Date;
  location: string;
  ownerEmail: string;
  showOnWeddingWebsite: boolean = false;
  guestList: any[]

  //UI
  numbersOfDaysToEvent?:any;
  month?: string;
  day?:string;
  dateText?: string;
}
