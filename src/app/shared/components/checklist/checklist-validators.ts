import { FormControl, FormArray, ValidationErrors } from '@angular/forms';

export class ChecklistValidators {

    static mandatoryFieldValidator(c: FormControl): ValidationErrors | null {
        const labelControl = c.get('label');
        const idControl = c.get('id');
        const selectedControl = c.get('selected');
        const activeControl = c.get('selected');
        const valid = (labelControl && idControl && selectedControl && activeControl) && 
            (labelControl.value && idControl.value && selectedControl.value && selectedControl.value);
        if ( valid ) {    
            return null;
        }
        return { invalid: true };
    }

    static mandatoryFieldsDuplicationValidator(c: FormControl): ValidationErrors | null {
        if (c instanceof FormArray) {
            let isDuplicatesFound = false;
            const userRoleForms = <FormArray>c;
            let ixRef = 0;
            let rowIx = 0;
            for (ixRef; ixRef < userRoleForms.length; ixRef++) {
                const formRef = userRoleForms.at(ixRef);
                let ix = 0;
                for (ix; ix < userRoleForms.length; ix++) {
                    const form = userRoleForms.at(ix);
                    // is the mandatory fiekds of forms are equals?
                    const isRoleTypeEquals = formRef.get('id')?.value === form.get('id')?.value;
                    const isModuleTypeEquals = formRef.get('label')?.value === form.get('label')?.value;
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
            return { 'duplication': { value : '(' + (ixRef + 1) + '. row vs. ' + (rowIx + 1) + '. row)'} };
        }
        return null;
    }
    
}



    