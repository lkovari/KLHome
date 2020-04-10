import { ICustomForm } from './custom-form.interface';

export class CustomFormModel implements ICustomForm {
    // data fields on main form
    customText: string | null;
    customNumber: number | null;
    // data fields on Tab Sheet 1
    customText1: string | null;
    customNumber1: number | null;
    // data fields on Tab Sheet 1
    customText2: string | null;
    customNumber2: number | null;
    // data fields on Tab Sheet 3
    customText3: string | null;
    customNumber3: number | null;

    constructor() {
        this.customText = null;
        this.customNumber = null;
        this.customText1 = null;
        this.customNumber1 = null;
        this.customText2 = null;
        this.customNumber2 = null;
        this.customText3 = null;
        this.customNumber3 = null;
    }
}
