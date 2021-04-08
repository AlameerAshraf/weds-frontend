export class event {
  _id?: string;
  name?: string = "";
  description?: string = "";
  date?: Date;
  location?: string= "";
  ownerEmail?: string= "";
  showOnWeddingWebsite?: boolean = false;
  guestList?: { status: string , name: string , email: string , phone: string , invitationMessage: string }[] = [];

  //UI
  numbersOfDaysToEvent?:any;
  month?: string= "";
  day?:string= "";
  dateText?: string= "";
  counts?: { "GOING" : number , "DECLINED" : number , "NO_RESPONSE" : number , "INVITED" : number } =
  { DECLINED: 0 , GOING : 0 , INVITED: 0 , NO_RESPONSE: 0 }
}
