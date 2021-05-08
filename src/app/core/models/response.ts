export class responseModel {
  error: boolean;
  code: number;
  message: string;
  details: any;
  data: any;
  EMAIL?: { message?: string, code?: string , SENT?: boolean } = { message: "", code: "", SENT: false };

};


export class errorBuilder {
  public static build(details){
    if(details.errors !== undefined){
      let errors = [];

      if(Object.keys(details.errors).length < 0) {
        return errors;
      } else {
        Object.keys(details.errors).forEach((k) => {
          let newError = { error: k , message: details.errors[k].message , type: details.errors[k].kind , field: details.errors[k].path };
          errors.push(newError);
        })
      }

      return errors;
    } else {
      return undefined;
    }
  }
};
