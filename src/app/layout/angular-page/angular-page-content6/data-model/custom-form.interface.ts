import { ITabData } from './custom-form-tab.interface';

export interface ICustomForm {
    customText: string | null;
    customNumber: number | null;
    emailAddress: string | null;
    tabData1: ITabData;
    tabData2: ITabData;
    tabData3: ITabData;
}
