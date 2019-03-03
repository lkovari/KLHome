import { ITabData3 } from './custom-form-tab3.interface';

export class TabData3 implements ITabData3 {
    customText: string;
    customNumber: number;
    emailAddress: string;
    freeText: string;
    zipCode: string;
    constructor() {
        this.customNumber = null;
        this.customText = null;
        this.emailAddress = null;
        this.zipCode = null;
        this.freeText = null;
    }
}
