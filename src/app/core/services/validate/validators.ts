export class validators {
  /** Register and login validation  */
  public static isEmailValid(value: string) {
    let result = [];

    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let isFormatValid = emailRegex.test(String(value).toLowerCase());

    if(!isFormatValid)
      result.push({ message : "Email format is not valid" , field: 'email' , id: 'email_format' , type: 'error'})

    return result;
  };

  /** Register and login validation  */
  public static isPasswordValid(value: string) {
    let result = [];

    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/;
    let isFormatValid = passwordRegex.test(String(value).toLowerCase());

    if(!isFormatValid)
      result.push({ message : "Password should 8 capital and small letters and special characters." ,
        field: 'password' , id: 'password_format' , type: 'error'})

    return result;
  };
};


