import { SelectItem } from 'primeng/api/selectitem';

export interface IRoleType extends SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
