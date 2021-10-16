import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    /**
     * 
     * @param c: AbstractControl
     * @param validationErrors: ValidationErrors
     * @returns ValidationErrors | null
     */
    static passwordMatchValidator(c: FormGroup, validationErrors: ValidationErrors | null): ValidationErrors | null {
        if (c instanceof FormGroup) {
            const formGroup = <FormGroup>c;
            const pw1 = formGroup.get('password')?.value;
            const pw2 = formGroup.get('confirmPassword')?.value;
            if (pw1 !== pw2) {
                if (validationErrors) {
                    validationErrors.passwordsmismatch = true;
                } else {
                    validationErrors = { 'passwordsmismatch':  true };
                }
            }
        }
        return validationErrors;
    }

    /**
     * 
     * @param c: AbstractControl
     * @returns ValidationErrors | null
     */
    static formGroupValidator(c: AbstractControl): ValidationErrors | null {
        //  ! is the Non-Null Assertion Operator
        let validationErrors!: ValidationErrors | null;
        if (c instanceof FormGroup) {
            const formGroup = <FormGroup>c;
            validationErrors = CustomValidators.passwordMatchValidator(formGroup, validationErrors);
        }
        return validationErrors;
    }    
}