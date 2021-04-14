export class user {
  _id?: string;
  name?: string = "";
  age?: string = "";
  phone?: string = "";
  email?: string = "";
  dateOfBirth?: Date = new Date;
  role?: string = "";
  isActive?: Boolean = true;
  isEmailConfirmed?: Boolean = false;
  isAccountLocked?: Boolean = false;
  password?: string = "";
  accountSource?: string = "";
};
