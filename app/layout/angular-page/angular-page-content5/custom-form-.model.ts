import { ICustomForm } from './custom-form.interface';

export class CustomFormModel implements ICustomForm {
    // data fields on main form
    customText: string;
    customNumber: number;
    // data fields on Tab Sheet 1
    customText1: string;
    customNumber1: number;
    // data fields on Tab Sheet 1
    customText2: string;
    customNumber2: number;
    // data fields on Tab Sheet 3
    customText3: string;
    customNumber3: number;

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
