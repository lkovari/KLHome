import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static FirstCharIsCapitalLetter(c: AbstractControl): ValidationErrors | null {
        const validationResult = {
            firstIsCapital: {
                invalid: true
            }
        };
        if (c !== undefined && c !== null && c.value && c.value.length > 0) {
            if (!(c.value.charCodeAt(0) >= 65 && c.value.charCodeAt(0) <= 90)) {
                validationResult.firstIsCapital.invalid = true;
            } else {
                validationResult.firstIsCapital.invalid = false;
            }
        } else {
            validationResult.firstIsCapital.invalid = false;
        }
        if (validationResult) {
            if (!validationResult.firstIsCapital.invalid) {
                return null;
            } else {
                return validationResult;
            }
        } else {
            return null;
        }
    }
}



