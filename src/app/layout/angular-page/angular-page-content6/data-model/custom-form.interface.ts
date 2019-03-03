import { ITabData } from './custom-form-tab.interface';

export interface ICustomForm {
    customText: string;
    customNumber: number;
    emailAddress: string;
    tabData1: ITabData;
    tabData2: ITabData;
    tabData3: ITabData;
}
