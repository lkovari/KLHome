import { ITabData2 } from './custom-form-tab2.interface';

export class TabData2 implements ITabData2 {
    customText: string | null;
    customNumber: number | null;
    emailAddress: string | null;
    zipCode: string | null;
    constructor() {
        this.customText = null;
        this.customNumber = null;
        this.emailAddress = null;
        this.zipCode = null;
    }
}
