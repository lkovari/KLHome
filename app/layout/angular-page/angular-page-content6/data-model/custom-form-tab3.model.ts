import { ITabData3 } from './custom-form-tab3.interface';

export class TabData3 implements ITabData3 {
    customText: string | null;
    customNumber: number | null;
    emailAddress: string | null;
    freeText: string | null;
    zipCode: string | null;
    constructor() {
        this.customNumber = null;
        this.customText = null;
        this.emailAddress = null;
        this.zipCode = null;
        this.freeText = null;
    }
}
