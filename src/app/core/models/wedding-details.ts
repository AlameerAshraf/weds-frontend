

export class weddingDetials{
  weddingDate?: string;
  budget?: string;
  venue?: string;
  numberOfGuests?: Number;
  partner?: {
    name?: string,
    email?: string;
    phone?: string;
    dateOfBirth?: string;
  } = { name: "" , email: "" , phone: "" , dateOfBirth: "" }
}
