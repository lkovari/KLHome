import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

export class CSTValidator  implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        throw new Error("Method not implemented.");
   }
}