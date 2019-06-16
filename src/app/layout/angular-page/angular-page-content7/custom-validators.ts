import { FormControl, FormArray, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static passwordCrossValidator(c: FormControl): ValidationErrors | null {
        const passwordControl = c.get('password');
        const confirmPasswordControl = c.get('confirmPassword');
        if (passwordControl && confirmPasswordControl) {
            // should type the user something into both fields
            if (passwordControl.pristine || confirmPasswordControl.pristine) {
                return null;
            }
            if (passwordControl.value === confirmPasswordControl.value) {
                return null;
            }
        }
        return { notidentical: true };
    }

    static userRolesValidator(c: FormControl): ValidationErrors | null {
        let isDuplicatesFound = false;
        if (c instanceof FormArray) {
            const userRoleForms = <FormArray>c;
            let ixRef = 0;
            for (ixRef; ixRef < userRoleForms.length; ixRef++) {
                const formRef = userRoleForms.at(ixRef);
                let ix = 0;
                for (ix; ix < userRoleForms.length; ix++) {
                    const form = userRoleForms.at(ix);
                    // is the forms equals and the index also?
                    const isRoleTypeRquals = formRef.get('roleType').value === form.get('roleType').value;
                    const isModuleTypeRquals = formRef.get('moduleType').value === form.get('moduleType').value;
                    if ((isRoleTypeRquals && isModuleTypeRquals) && (ixRef !== ix)) {
                        isDuplicatesFound = true;
                        break;
                    }
                }
                if (isDuplicatesFound) {
                    break;
                }
            }
            if (!isDuplicatesFound) {
                return null;
            }
            return { duplication: isDuplicatesFound };
        }
    }
}
