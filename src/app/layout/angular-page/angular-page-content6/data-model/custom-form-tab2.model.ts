import { ITabData2 } from './custom-form-tab2.interface';

export class TabData2 implements ITabData2 {
    customText: string;
    customNumber: number;
    emailAddress: string;
    zipCode: string;
    constructor() {
        this.customText = null;
        this.customNumber = null;
        this.emailAddress = null;
        this.zipCode = null;
    }
}
