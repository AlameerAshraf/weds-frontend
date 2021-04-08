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
}
