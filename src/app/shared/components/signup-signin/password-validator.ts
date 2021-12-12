import { AbstractControl, FormGroup } from "@angular/forms";

export class PasswordValidator {
    public static passwordCrossValidator(c: AbstractControl) {
        if (c instanceof FormGroup) {
            const passwordControl = c.get('password');
            const confirmPasswordControl = c.get('confirmPassword');
            if (passwordControl && confirmPasswordControl) {
                /* should type the user something into both fields
                if (passwordControl.pristine || confirmPasswordControl.pristine) {
                    return null;
                }
                */
                if (passwordControl.value === confirmPasswordControl.value) {
                    return null;
                }
            }
        }
        return { notidentical: true };
    }
}
