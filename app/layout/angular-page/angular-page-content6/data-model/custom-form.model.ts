import { ICustomForm } from './custom-form.interface';
import { TabData1 } from './custom-form-tab1.model';
import { TabData2 } from './custom-form-tab2.model';
import { TabData3 } from './custom-form-tab3.model';

export class CustomFormModel implements ICustomForm {
    customText: string;
    customNumber: number;
    emailAddress: string;
    tabData1: TabData1;
    tabData2: TabData2;
    tabData3: TabData3;
    constructor() {
        this.tabData1 = new TabData1();
        this.tabData2 = new TabData2();
        this.tabData3 = new TabData3();
    }
}
