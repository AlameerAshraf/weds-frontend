import { validators } from './validators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validate(fieldName: string, fieldValue: string) {
    let validationResult: any[] = [];
    switch (fieldName) {
      case 'email':
        validationResult = validationResult.concat(validators.isEmailValid(fieldValue));
        break;

      case 'password':
        validationResult = validationResult.concat(validators.isPasswordValid(fieldValue));
        break;

      default:
        return [];
    }

    return validationResult[0];
  };



}
