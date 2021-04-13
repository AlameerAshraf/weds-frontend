export class budgeter {
  _id?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  recommendedPercentage?: number;
  amount?: number;
  vendor?: {
    vendorId?: string;
    amountSpent?: number;
    note?: string;
  } = { vendorId: "" , amountSpent: 0 , note: "" }

  //UI
  isNew?: boolean;
}
