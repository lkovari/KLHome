import * as forms from '@angular/forms';
import { FormArray } from '@angular/forms';

export interface IDupEntry {
    id: number;
    atrow: number;
    androw: number;
    atrowAsTx: string;
    androwAsTx: string;
}
export class FormArrayCustomValidators {

    static passwordCrossValidator(c: forms.AbstractControl): forms.ValidationErrors | null {
        if (c instanceof forms.FormGroup) {
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

    private static duplicationFound(duplications: IDupEntry[], item: IDupEntry): boolean {
        let revFound: IDupEntry | undefined;
        const found = duplications.find((dupItem: IDupEntry) => {
            return dupItem.androw === item.androw && dupItem.atrow === item.atrow;
        });
        if (!found) {
            revFound = duplications.find((dupItem: IDupEntry) => {
                return dupItem.androw === item.atrow && dupItem.atrow === item.androw;
            });
        }
        return !(found !== null && found !== undefined) && (revFound !== null && revFound !== undefined);
    }

    static userRolesValidator(c: forms.AbstractControl): forms.ValidationErrors | null {
        if (c instanceof FormArray) {
            // let isDuplicatesFound = false;
            const userRoleForms = <forms.FormArray>c;
            let ixRef: number = 0;
            let rowIx: number = 0;
            const duplications: { id: number, atrow: number, androw: number, atrowAsTx: string, androwAsTx: string }[] = [];
            let dupCnt: number = 0;
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
                        const item: IDupEntry = { 'id': dupCnt, 'atrow': (ixRef + 1), 'androw': (rowIx + 1), 'atrowAsTx': '' + (ixRef + 1), 'androwAsTx':  '' + (rowIx + 1) };
                        if (!FormArrayCustomValidators.duplicationFound(duplications, item)) {
                            duplications.push(item);
                            dupCnt = dupCnt + 1;
                        }
                    }
                }
            }
           if (duplications.length === 0) {
               return null;
           }
           const retValue = { 'duplications': { values: Array<{ id: number, atrow: number, androw: number }>() } };
           retValue.duplications.values = new Array<{ id: number, atrow: number, androw: number }>();
           duplications.forEach((item: { id: number, atrow: number, androw: number }) => {
            retValue.duplications.values.push(item);
           });
           return retValue;
        }
        return null;
    }
}
