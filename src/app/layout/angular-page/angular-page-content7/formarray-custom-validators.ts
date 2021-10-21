import * as forms from '@angular/forms';
import { FormArray } from '@angular/forms';

interface IDupEntry { 
    id: number;
    atrow: number;
    androw: number;
}
export class FormArrayCustomValidators {

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

    private static duplicationFound(duplications: IDupEntry[], item: IDupEntry): boolean {
        let revFound: IDupEntry | undefined;
        let found = duplications.find((dupItem: IDupEntry) => {
            return dupItem.androw === item.androw && dupItem.atrow === item.atrow;
        });
        if (!found) {
            revFound = duplications.find((dupItem: IDupEntry) => {
                return dupItem.androw === item.atrow && dupItem.atrow === item.androw;
            });            
        }
        return !(found !== null && found !== undefined) && (revFound !== null && revFound !== undefined);
    }

    static userRolesValidator(c: forms.FormControl): forms.ValidationErrors | null {
        if (c instanceof FormArray) {
            // let isDuplicatesFound = false;
            const userRoleForms = <forms.FormArray>c;
            let ixRef = 0;
            let rowIx = 0;
            let duplications: { id: number, atrow: number, androw: number }[] = [];
            let dupCnt = 0;
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
                        // isDuplicatesFound = true;
                        const item = { "id": dupCnt, "atrow": (ixRef + 1), "androw": (rowIx + 1)};
                        if (!FormArrayCustomValidators.duplicationFound(duplications, item)) {
                            duplications.push(item);
                            dupCnt = dupCnt + 1;
                        }
                        // break;
                    }
                }
                /*
                if (isDuplicatesFound) {
                    break;
                }
                */
            }
            /*
            if (!isDuplicatesFound) {
                return null;
            }
            */
           if (duplications.length === 0) {
               return null;
           }
           // let retValue = { 'duplications': { values: [] } };
           let retValue = { 'duplications': { values: Array<{ id: number, atrow: number, androw: number }>() } };
           retValue.duplications.values = new Array<{ id: number, atrow: number, androw: number }>();
           duplications.forEach((item: { id: number, atrow: number, androw: number }) => {
            retValue.duplications.values.push(item);
           });
           // return { 'duplications': { value : '(at row ' + (ixRef + 1) + '. and row ' + (rowIx + 1) + '.)'} };
           return retValue;
        }
        return null;
    }
}
