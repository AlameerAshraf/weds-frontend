

export class weddingDetials{
  weddingDate?: Date;
  budget?: string;
  venue?: string;
  numberOfGuests?: Number;
  partener?: {
    name?: string,
    email?: string;
    phone?: string;
    dateOfBirth?: string;
  } = { name: "" , email: "" , phone: "" , dateOfBirth: "" }
}
