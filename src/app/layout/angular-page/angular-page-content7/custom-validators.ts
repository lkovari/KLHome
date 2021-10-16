import * as forms from '@angular/forms';
import { FormArray } from '@angular/forms';

export class CustomValidators {

    static passwordCrossValidator(c: forms.FormControl): forms.ValidationErrors | null {
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
        return { notidentical: true };
    }

    static userRolesValidator(c: forms.FormControl): forms.ValidationErrors | null {
        if (c instanceof FormArray) {
            let isDuplicatesFound = false;
            const userRoleForms = <forms.FormArray>c;
            let ixRef = 0;
            let rowIx = 0;
            for (ixRef; ixRef < userRoleForms.length; ixRef++) {
                const formRef = userRoleForms.at(ixRef);
                let ix = 0;
                for (ix; ix < userRoleForms.length; ix++) {
                    const form = userRoleForms.at(ix);
                    // is the mandatory fiekds of forms are equals?
                    const isRoleTypeEquals = formRef.get('roleType')?.value === form.get('roleType')?.value;
                    const isModuleTypeEquals = formRef.get('moduleType')?.value === form.get('moduleType')?.value;
                    if ((isRoleTypeEquals && isModuleTypeEquals) && (ixRef !== ix)) {
                        rowIx = ix;
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
            // return { duplication: isDuplicatesFound };
            return { 'duplication': { value : '(at row ' + (ixRef + 1) + '. and row ' + (rowIx + 1) + '.)'} };
        }
        return null;
    }
}
