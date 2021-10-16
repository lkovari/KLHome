import * as forms from '@angular/forms';
import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export class FormArrayCustomValidators {

    static hexIdDuplicationValidator(c: forms.FormArray, validationErrors: ValidationErrors | null): forms.ValidationErrors | null {
        if (c instanceof FormArray) {
            let isDuplicatesFound = false;
            const formOfRow = <forms.FormArray>c;
            let ixRef = 0;
            let rowIx = 0;
            for (ixRef; ixRef < formOfRow.length; ixRef++) {
                const formRef = formOfRow.at(ixRef);
                let ix = 0;
                for (ix; ix < formOfRow.length; ix++) {
                    const form = formOfRow.at(ix);
                    // is the mandatory fields of forms are equals?
                    const isHexIdEquals = formRef.get('hexId')?.value === form.get('hexId')?.value;
                    if (isHexIdEquals && (ixRef !== ix)) {
                        rowIx = ix;
                        isDuplicatesFound = true;
                        break;
                    }
                }
                if (isDuplicatesFound) {
                    break;
                }
            }
            if (isDuplicatesFound) {
                if (validationErrors) {
                    // `( row at ${ixRef + 1)} . matched with row at ${rowIx + 1)}.`
                    validationErrors.hexIdDuplication = { 
                        value : `( row at ${ixRef + 1} . matched with row at ${rowIx + 1}.`
                    };
                } else {
                    validationErrors = { 'hexIdDuplication':  { value : `( row at ${ixRef + 1} . matched with row at ${rowIx + 1}.` } };
                }
            }
        }
        return validationErrors;
    }

    static formArrayValidator(c: AbstractControl): ValidationErrors | null {
        //  ! is the Non-Null Assertion Operator
        let validationErrors!: forms.ValidationErrors | null;
        if (c instanceof FormArray) {
            const formArrayForms = <FormArray>c;
            validationErrors = FormArrayCustomValidators.hexIdDuplicationValidator(formArrayForms, validationErrors);
        }
        return validationErrors;
    }

}
