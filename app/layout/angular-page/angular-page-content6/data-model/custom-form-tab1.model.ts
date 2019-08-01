import { ITabData1 } from './custom-form-tab1.interface';

export class TabData1 implements ITabData1 {
    customText: string;
    customNumber: number;
    emailAddress: string;
    freeText: string;
    maskedText: string;
    constructor() {
        this.customNumber = null;
        this.customText = null;
        this.emailAddress = null;
        this.freeText = null;
        this.maskedText = null;
    }
}
