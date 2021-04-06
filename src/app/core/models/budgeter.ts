export class budgeter {
  _id?: string;
  name: string;
  description: string;
  recommendedPercentage: number;
  amount: number;
  vendor?: {
    vendorId?: string;
    amountSpent?: number;
    note?: string;
  } = { vendorId: "" , amountSpent: 0 , note: "" }
}
