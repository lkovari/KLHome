import { Directive} from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

function validateFirstCharIsCapitalLetter(): ValidatorFn {
  // { [key: string]: boolean } | null
    const validationResult = {
      firstcapital: {
        invalid: true
      }
  };
    return (c: AbstractControl) => {
        if (c !== undefined && c !== null && c.value && c.value.length > 0) {
          if (!(c.value.charCodeAt(0) >= 65 && c.value.charCodeAt(0) <= 90)) {
              validationResult.firstcapital.invalid = true;
          } else {
            validationResult.firstcapital.invalid = false;
          }
        } else {
          validationResult.firstcapital.invalid = false;
        }
        if (validationResult) {
          if (!validationResult.firstcapital.invalid) {
            return null;
          } else {
            return validationResult;
          }
        } else {
          return null;
        }
    };
  }

@Directive({
    selector: '[app-firstCapital][ngModel]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: FirstCapitalCharCustomValidator, multi: true }
    ]
})
export class FirstCapitalCharCustomValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
      this.validator = validateFirstCharIsCapitalLetter();
    }

    validate(c: FormControl) {
      return this.validator(c);
    }
}
