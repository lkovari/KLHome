import { ITabData1 } from './custom-form-tab1.interface';

export class TabData1 implements ITabData1 {
    customText: string | null;
    customNumber: number | null;
    emailAddress: string | null;
    freeText: string | null;
    maskedText: string | null;
    constructor() {
        this.customNumber = null;
        this.customText = null;
        this.emailAddress = null;
        this.freeText = null;
        this.maskedText = null;
    }
}
